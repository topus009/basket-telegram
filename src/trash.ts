// =============================================================================
// if (isProd) {
//   if (!webhookDomain) throw new Error('"WEBHOOK_DOMAIN" env var is required!');

//   app.post(bot.secretPathComponent(), async (req, rep) => {
//     const webhook = await bot.createWebhook({
//       domain: webhookDomain
//     });

//     return webhook(req.raw, rep.raw)
//   });
// }
// =============================================================================
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
// =============================================================================
// const isProd = NODE_ENV === "production"
// =============================================================================
// {
//   command: 'newgame',
//   description: 'Заполнить очки новой игры',
// },
// {
//   command: 'exitgame',
//   description: 'Выйти из игры',
// },
// =============================================================================
// handleNewGame(bot)
// handleExitGame(bot)
// =============================================================================
// const stage = new Scenes.Stage<Scenes.WizardContext>([newGameScene, ...playersGamesScenes]);
// bot.use(session());
// bot.use(stage.middleware());
// =============================================================================
// const handleNewGame = (bot: MY_BOT) => {
//   bot.command("newgame", async ctx => {
//     return await ctx.scene.enter("newgame");
//   });
// }

// const handleExitGame = (bot: MY_BOT) => {
//   bot.command("exitGame", async (ctx, next) => {
//     ctx.scene.leave('newgame');
//     return next()
//   });
// }
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
// =============================================================================
