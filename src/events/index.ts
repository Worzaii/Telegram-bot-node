import type { Bot } from "node-telegram-bot-api";
import { registerMessageHandler } from "./message.js";

export function registerEvents(bot: Bot): void {
    registerMessageHandler(bot);
}