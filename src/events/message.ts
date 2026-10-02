import type { Bot } from "node-telegram-bot-api";
import { protectedChatTypes, verificationUrl } from "../config/telegram.js";
import { isVerified } from "../services/verificationService.js";

export function registerMessageHandler(bot: Bot): void {
    bot.on("message", async (ctx) => {
        const message = ctx.message;

        if (!message || !ctx.chat || !ctx.from || !protectedChatTypes.has(ctx.chat.type)) {
            return;
        }

        if (ctx.from.is_bot || await isVerified(ctx.from.id)) {
            return;
        }

        try {
            await ctx.api.deleteMessage({
                chat_id: ctx.chat.id,
                message_id: message.message_id,
            });
        } catch (error) {
            console.error("Could not delete an unverified message. Is the bot an admin?", error);
            return;
        }

        const prompt = "Please verify with the bot in a private chat before sending messages here.";

        try {
            await ctx.api.sendMessage({
                chat_id: ctx.from.id,
                text: `${prompt}\n${verificationUrl}`,
            });
        } catch {
            await ctx.api.sendMessage({
                chat_id: ctx.chat.id,
                text: `${prompt}\n${verificationUrl}`,
            });
        }
    });
}