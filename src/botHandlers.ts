import {Context} from "telegraf";
import {message} from "telegraf/filters"
import {Chat} from "telegraf/typings/core/types/typegram";
import axios from 'axios';

const players: Players[] = [
  "nastya",
  "stepan",
  "sergey",
]

const {
  MY_ID,
  BACKEND_URL
} = process.env;

const isMyId = (id: Chat.AbstractChat["id"]) => `${id}` === MY_ID;

const stopBotOnInit = (bot: MY_BOT) => {
  try {
    bot.stop('INIT')
  } catch (error) {
    console.log(error)
  }
}

const sendChartPhoto = (ctx: Context) => {
  if (BACKEND_URL) {
    return ctx.replyWithPhoto({
      url: BACKEND_URL
    })
  } else {
    console.log(`BACKEND_URL is invalid`)
  }
}

const handleGetChart = (bot: MY_BOT) => {
  bot.command("chart", ctx => {
    if (BACKEND_URL) {
      return ctx.replyWithPhoto({
        url: BACKEND_URL
      })
    } else {
      console.log(`BACKEND_URL is invalid`)
    }
  });
}

const handleReplyToMeUserMessages = (bot: MY_BOT) => {
  bot.on(message("text"), async (ctx) => {
    // if (!isMyId(ctx.chat.id)) {

    // }
    const message = `@${ctx.message.from.username} написал "${ctx.message.text}"`
    ctx.telegram.sendMessage(MY_ID, message)

    const [player, points] = (ctx.message.text || "").split("=")

    if (players.includes(player as Players)) {

      const query = new URLSearchParams({player, points})
      const queryString = query.toString()

      try {
        const res = await axios({
          url: `${BACKEND_URL}/player?${queryString}`,
          method: 'GET',
        });

        ctx.reply(res?.data)
      } catch (error) {
        console.log(error)
      }


    }
  });
}

const handleUserConnected = (bot: MY_BOT) => {
  bot.start((ctx) => {
    if (!isMyId(ctx.chat.id)) {
      const message = `@${ctx.message.from.username} присоеденился`
      ctx.telegram.sendMessage(MY_ID, message)
    }

    ctx.reply(`Welcome @${ctx.message.from.username}`)
  });
}

const launchBot = (bot: MY_BOT) => {
  bot.launch().then(() => {
    console.log("Bot launched")
  }).catch((error) => {
    console.log("Bot launch failed")
    console.log(error)
  });
}

export {
  handleReplyToMeUserMessages,
  stopBotOnInit,
  handleGetChart,
  handleUserConnected,
  launchBot,
  sendChartPhoto,
}
