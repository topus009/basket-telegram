import process from 'node:process';

import fastify, {
  FastifyListenOptions,
} from "fastify";

import {Telegraf} from "telegraf";
import healthCheck from 'fastify-healthcheck';

const {
  NODE_ENV,
  BACKEND_URL,
  PORT,
  BOT_TOKEN: token,
  // WEBHOOK_DOMAIN: webhookDomain,
} = process.env;

const isProd = NODE_ENV === "production"

const port = parseInt(PORT || "3001", 10);
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

bot.launch();

app.listen(serverOpts, (err, address) => {
  console.log("Listening on port", port)

  if (err) {
    app.log.error(err)
    console.log(err)
    process.exit(1)
  }
});

const handleExit = (message = "exit") => {
  return (e: Error) => {
    if (e?.stack) {
      console.log('[uncaughtException] app will be terminated: ', e.stack);
    }
    try {
      bot.stop(message)
    } catch (error: any) {
      console.log('exiting and stopping bot error = ', error);
    }
    process.exit(1)
  }
}

process.on('exit', handleExit());
//catches ctrl+c event
process.on('SIGINT', handleExit());
// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', handleExit());
process.on('SIGUSR2', handleExit());
process.on('SIGTERM', handleExit())
// process.on('uncaughtException', handleExit)
// -----------------------------------------------
// const others = [`SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`]
// others.forEach((eventType) => {
//   process.on(eventType, exitRouter.bind(null, {exit: true}));
// })
// function exitRouter(options: any, exitCode: number) {
//   if (exitCode || exitCode === 0) console.log(`ExitCode ${exitCode}`);
//   if (options?.exit) process.exit();
// }

// const exitHandler = (exitCode: number) => {
//   console.log(`ExitCode ${exitCode}`);
//   console.log('Exiting finally...')
// }

// process.on('exit', exitHandler)
