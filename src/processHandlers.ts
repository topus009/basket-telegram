const handleExit = (bot: MY_BOT, message = "exit") => {
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

const onNodeProcesses = (bot: MY_BOT) => {
  process.on('exit', handleExit(bot));
  //catches ctrl+c event
  process.on('SIGINT', handleExit(bot));
  // catches "kill pid" (for example: nodemon restart)
  process.on('SIGUSR1', handleExit(bot));
  process.on('SIGUSR2', handleExit(bot));
  process.on('SIGTERM', handleExit(bot))
}

export {
  onNodeProcesses
}
