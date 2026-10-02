import { Bot } from "node-telegram-bot-api";
import { run } from "node-telegram-bot-api/node";
import { env } from "./config/env.js";
import sequelize from "./tools/sequelize.js";
import { registerCommands } from "./commands/index.js";
import { registerEvents } from "./events/index.js";

const bot = new Bot(env.botToken);

registerCommands(bot);
registerEvents(bot);

bot.catch((error) => console.error("Bot handler failed", error));

await sequelize.authenticate();
await sequelize.sync();

console.log("Database connected; verification bot is running.");

await run(bot);