const handleExit = (bot: IBot, message = 'exit') => (e: Error) => {
  if (e?.stack) {
    console.log('[uncaughtException] app will be terminated: ', e.stack);
  }
  try {
    bot.stop(message);
  } catch (error: unknown) {
    console.log('exiting and stopping bot error = ', error);
  }
  process.exit(1);
};

const PROCESS_EVENTS = [
  'exit',
  // catches ctrl+c event
  'SIGINT',
  // catches "kill pid" (for example: nodemon restart)
  'SIGUSR1',
  'SIGUSR2',
  'SIGTERM',
];

const onNodeProcesses = (bot: IBot) => {
  PROCESS_EVENTS.forEach((event) => {
    process.on(event, handleExit(bot, event));
  });
};

export default onNodeProcesses;
