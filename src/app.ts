import TelegramBot from "node-telegram-bot-api";
import axios from 'axios';

const bot = new TelegramBot(`${process.env.TOKEN}`, {polling: true});

(async () => {
  bot.on("message", async (msg) => {
    if (msg?.from?.id) {
      const res = await axios({
        url: `${process.env.BACKEND_URL}`,
        method: 'GET',
        responseType: 'arraybuffer'
      });

      await bot.sendPhoto(msg.from.id, res.data);
    }
  });
})()
