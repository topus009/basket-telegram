import {
  Markup, Scenes,
} from 'telegraf';
// import { sendChartPhoto } from './botHandlers';

const points: Points = {
  nastya: '',
  stepan: '',
  sergey: '',
};

const getButton = (player: Players) => Markup.button.callback(player, player);

const getKeyboard = (): IKeyboard => {
  const playerKeys = Object.keys(points) as Players[];
  const buttons = playerKeys.map((player: Players): ICbBtn | undefined => {
    if (!points[player as Players]) {
      return getButton(player);
    }

    return undefined;
  }).filter(Boolean) as ICbBtn[];

  return buttons;
};

// const stepHandler = new Composer<Scenes.WizardContext>();
// stepHandler.action("nastya", async ctx => {
//   await ctx.reply("Step 2. Via inline button");
//   return ctx.wizard.next();
// });
// stepHandler.command("stepan", async ctx => {
//   await ctx.reply("Step 2. Via command");
//   return ctx.wizard.next();
// });

// stepHandler.use(async (ctx) =>
//   await ctx.reply('Выберите игрока', Markup.inlineKeyboard(keyboard))
// );

const newGameScene = new Scenes.WizardScene(
  'newgame',
  async (ctx, next) => {
    await ctx.reply('Выберите игрока', Markup.inlineKeyboard([
      [
        ...getKeyboard(),
        // Markup.button.callback("Выйти", "exitGame")
      ],
    ]));
    await ctx.scene.leave();
    next();
  },
);

const playerPointsScene = (player: string) => new Scenes.WizardScene(
  player,
  async (ctx) => {
    await ctx.reply('Введите очки в формате...');
    await ctx.reply('10110 10110 10110 10110 10110');
    return ctx.wizard.next();
  },
  async (ctx) => {
    await ctx.reply(`Очки игрока "${player}" записаны`);
    const leftBtns = getKeyboard();

    if (leftBtns?.length) {
      return ctx.reply('Осталось заполнить очки игроков', Markup.inlineKeyboard(leftBtns));
    }

    Object.keys(points).forEach((playerName) => {
      points[playerName as Players] = '';
    });
    ctx.reply('Все очки записаны. Спасибо');
    ctx.reply('Сейчас придет обновленный график');
    // sendChartPhoto(ctx)
    return ctx.scene.leave();
  },
);

const playersGamesScenes = Object.keys(points).map(playerPointsScene);

export {
  newGameScene,
  playersGamesScenes,
  points,
  getButton,
  getKeyboard,
};
