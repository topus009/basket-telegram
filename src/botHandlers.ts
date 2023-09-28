import vega from 'vega';
import lite, { TopLevelSpec } from 'vega-lite';
import sharp from 'sharp';

import { Context } from 'telegraf';
import { message } from 'telegraf/filters';
import type { Chat } from 'telegraf/typings/core/types/typegram';

import chartScheme from './chartScheme';
import chartConfig from './chartConfig';

import knex from './knex/knex';
import prepareChartConfig from './prepareChartConfig';

const players: Players[] = [
  'nastya',
  'stepan',
  'sergey',
];

const {
  MY_ID,
} = process.env;

const render = async () => {
  const games = await knex.select().from('games');
  const chartData = await prepareChartConfig(games);
  const vegaspec = lite.compile({
    ...chartScheme,
    data: {
      values: chartData,
    },
  } as TopLevelSpec).spec;
  // console.log({ chartData });
  const view = new vega.View(
    vega.parse(vegaspec, chartConfig),
    { renderer: 'none' },
  );

  const svg = await view.toSVG();

  return sharp(Buffer.from(svg)).toFormat('png');
};

const isMyId = (id: Chat.AbstractChat['id']) => `${id}` === MY_ID;

const stopBotOnInit = (bot: IBot) => {
  try {
    bot.stop('INIT');
  } catch (error) {
    console.log(error);
  }
};

// const sendChartPhoto = async (ctx: Context)
// : Promise<(ReturnType<Context['sendPhoto']> | void)> => {
//   const res = await render();

//   return await ctx.replyWithPhoto({
//     source: res,
//     filename: 'chart.png',
//   });
// };

const handleGetChart = (bot: IBot) => {
  bot.command('chart', async (ctx): Promise<(ReturnType<Context['sendPhoto' | 'reply']> | void)> => {
    try {
      // return await sendChartPhoto(ctx);
      const res = await render();

      return await ctx.replyWithPhoto({
        source: res,
        filename: 'chart.png',
      });
    } catch (error) {
      console.log(error);
      return ctx.reply('Чтото не так с картинкой');
    }
  });
};

const handleReplyToMeUserMessages = (bot: IBot) => {
  bot.on(message('text'), async (ctx) => {
    if (!isMyId(ctx.chat.id)) {
      const msg = `@${ctx.message.from.username} написал "${ctx.message.text}"`;
      ctx.telegram.sendMessage(MY_ID, msg);

      const [player, points] = (ctx.message.text || '').split('=');

      if (players.includes(player as Players)) {
        // const query = new URLSearchParams({ player, points });
        // const queryString = query.toString();

        try {
          const [lastMaxId] = await knex('games').max('id');
          const id = Number(lastMaxId?.max);
          const queryPoints = points.split('_').reduce((acc, it, index) => {
            acc[index + 1] = it.split('').map(Number);

            return acc;
          }, {} as PointInDB);

          const preparedPoints = JSON.stringify(queryPoints);
          const preparedData = {
            [player]: preparedPoints,
          };

          // ==============================================
          // await knex('games').delete().where({id: 7});
          // return;
          // ==============================================
          const editedRow = await knex('games').select().where({ id }).first();

          if (!editedRow) {
            return await ctx.reply('Ни одна запись в таблице не найдена');
          }

          const leftPlayers = Object.keys(editedRow).filter((it) => it !== player && it !== 'id' && !editedRow[it]);

          if (editedRow[player]) {
            // Очки игрока уже записаны. Смотрим что у других
            const allPlayersHasPoints = leftPlayers.every((it) => editedRow[it]);

            if (allPlayersHasPoints) {
              // Делаем новую запись
              const newId = id + 1;
              await knex('games').insert({ ...preparedData, id: newId });
              return await ctx.reply(`Очки игрока "${player}" записаны. Создана новая запись`);
            }
            return await ctx.reply(`Очки игрока "${player}" уже записаны. Осталось записать игроков "${leftPlayers.filter((it) => it !== player).join(', ')}"`);
          }
          // Уже есть запись в которой нет игрока
          await knex('games').update(preparedData).where({ id });
          const leftPlayersAfter = leftPlayers.filter((it) => it !== player);

          if (leftPlayersAfter.length) {
            return await ctx.reply(`Очки игрока "${player}" записаны в текущую игру. Осталось записать игроков "${leftPlayers.filter((it) => it !== player).join(', ')}"`);
          }
          return await ctx.reply(`Очки игрока "${player}" записаны в текущую игру. Все очки всех игроков записаны. Спасибо`);

          // ctx.reply(res?.data);
        } catch (error) {
          console.log(error);
        }
      }
    }
  });
};

const handleUserConnected = (bot: IBot) => {
  bot.start((ctx) => {
    if (!isMyId(ctx.chat.id)) {
      const msg = `@${ctx.message.from.username} присоеденился`;
      ctx.telegram.sendMessage(MY_ID, msg);
    }

    ctx.reply(`Welcome @${ctx.message.from.username}`);
  });
};

const launchBot = (bot: IBot) => {
  bot.launch().then(() => {
    console.log('Bot launched');
  }).catch((error) => {
    console.log('Bot launch failed');
    console.log(error);
  });
};

export {
  handleReplyToMeUserMessages,
  stopBotOnInit,
  handleGetChart,
  handleUserConnected,
  launchBot,
  // sendChartPhoto,
};
