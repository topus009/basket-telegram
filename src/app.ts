import process from 'node:process';

import fastify, {
  // fastify,
  FastifyInstance,
  FastifyListenOptions,
} from "fastify";

import {Telegraf} from "telegraf";
import healthCheck from 'fastify-healthcheck';

const {
  NODE_ENV,
  BACKEND_URL,
  FASTTIFY_PORT,
  BOT_PORT,
  BOT_TOKEN: token,
  WEBHOOK_DOMAIN: webhookDomain,
} = process.env;

const isProd = NODE_ENV === "production"

const port = parseInt(FASTTIFY_PORT || "3001", 10);
const bot_port = parseInt(BOT_PORT || "3000", 10);
const host = ("RENDER" in process.env) ? `0.0.0.0` : `localhost`;
const serverOpts: FastifyListenOptions = {
  port,
  host,
}
const bot = new Telegraf(`${token}`);
const app = fastify();

try {
  bot.stop('INIT')
} catch (error) {
  console.log("================================")
  console.log(error)
  console.log("================================")
}

// if (isProd) {
//   if (!webhookDomain) throw new Error('"WEBHOOK_DOMAIN" env var is required!');

//   app.post(bot.secretPathComponent(), async (req, rep) => {
//     const webhook = await bot.createWebhook({
//       domain: webhookDomain
//     });

//     return webhook(req.raw, rep.raw)
//   });
// }

app.register(healthCheck)

bot.start((ctx) => ctx.reply('Welcome'))

bot.on("message", ctx => {
  if (BACKEND_URL) {
    return ctx.replyWithPhoto({
      url: BACKEND_URL
    })
  } else {
    return ctx.reply(`BACKEND_URL is invalid`)
  }
});

bot
  .launch()
  .then(() => console.log("Webhook bot listening on port", BOT_PORT));

app.listen(serverOpts, (err, address) => {
  console.log("Listening on port", port)

  if (err) {
    app.log.error(err)
    console.log(err)
    process.exit(1)
  }
});

process.on('exit', () => bot.stop('SIGTERM'));
//catches ctrl+c event
process.on('SIGINT', () => bot.stop('SIGTERM'));
// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', () => bot.stop('SIGTERM'));
process.on('SIGUSR2', () => bot.stop('SIGTERM'));
process.once('SIGTERM', () => bot.stop('SIGTERM'))
process.once('uncaughtException', (e) => {
  console.log('[uncaughtException] app will be terminated: ', e.stack);
  bot.stop('SIGTERM')

  process.exit(0)
})
