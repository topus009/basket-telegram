import {Telegraf, Context, Markup} from "telegraf";
import fastify from "fastify";

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

  type FASTIFY_APP = ReturnType<typeof fastify>

  type MY_BOT = Telegraf<Scenes.WizardContext>

  type Players = "nastya" | "stepan" | "sergey"

  type Points = Record<Players, string>

  type CB_BUTTON = ReturnType<typeof Markup.button.callback>
  type KEYBOARD = CB_BUTTON[]
}

export { }
