import { Telegraf, Scenes, Markup } from 'telegraf';
import fastify from 'fastify';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string
      BACKEND_URL: string
      PORT: string
      MY_ID: string
      BOT_TOKEN: string
    }
  }

  type IFastifyApp = ReturnType<typeof fastify>;

  type IBot = Telegraf<Scenes.WizardContext>;

  type Players = 'nastya' | 'stepan' | 'sergey';

  type Points = Record<Players, string>;

  type ICbBtn = ReturnType<typeof Markup.button.callback>;
  type IKeyboard = ICbBtn[];
}

export { };
