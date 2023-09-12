import TelegramBot, {ConstructorOptions} from "node-telegram-bot-api";
import axios from 'axios';

const options: ConstructorOptions = {
  polling: true,
}

const bot = new TelegramBot(`${process.env.TOKEN}`, options);
const BACKEND_URL = process.env.BACKEND_URL;

const init = async () => {
  bot.on("message", async (msg) => {
    if (msg?.from?.id) {
      try {
        const res = await axios({
          url: BACKEND_URL,
          method: 'GET',
          responseType: 'arraybuffer'
        });

        await bot.sendPhoto(msg.from.id, res.data);
      } catch (error) {
        console.log(error)
      }
    }
  });
}

init();
