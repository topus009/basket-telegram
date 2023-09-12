import TelegramBot from "node-telegram-bot-api";
import axios from 'axios';

const bot = new TelegramBot(`${process.env.TOKEN}`, {polling: true});
const BACKEND_URL = process.env.BACKEND_URL;

(async () => {
  bot.on("message", async (msg) => {
    if (msg?.from?.id) {
      const res = await axios({
        url: BACKEND_URL,
        method: 'GET',
        responseType: 'arraybuffer'
      });

      await bot.sendPhoto(msg.from.id, res.data);
    }
  });
})()
