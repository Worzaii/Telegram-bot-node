import type { Bot } from "node-telegram-bot-api";
import { registerStartCommand } from "./start.js";

export function registerCommands(bot: Bot): void {
    registerStartCommand(bot);
}