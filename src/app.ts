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

console.log({
  NODE_ENV,
  BACKEND_URL,
  FASTTIFY_PORT,
  BOT_PORT,
  token,
  webhookDomain,
})

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
    // process.exit(1)
  }
});

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
