import process from 'process';
import fastify from 'fastify';
import { Scenes, Telegraf } from 'telegraf';
import { BotCommand } from 'telegraf/types';

import onNodeProcesses from './processHandlers';
import {
  stopBotOnInit, handleGetChart, handleReplyToMeUserMessages, handleUserConnected, launchBot,
} from './botHandlers';
import { addHealthCheckToApp, serverListen } from './appHandlers';

const bot = new Telegraf<Scenes.WizardContext>(process.env.BOT_TOKEN);
// bot.use(Telegraf.log());

const app = fastify();

// process init
stopBotOnInit(bot);
// bot scenes

// bot commands
const commands: BotCommand[] = [
  {
    command: 'chart',
    description: 'Показать график всех игр',
  },
];

bot.telegram.setMyCommands(commands);

// app routes
addHealthCheckToApp(app);

// bot handlers
handleUserConnected(bot);
handleGetChart(bot);

handleReplyToMeUserMessages(bot);

// start
launchBot(bot);
// app start
serverListen(app);
// process handlers
onNodeProcesses(bot);
