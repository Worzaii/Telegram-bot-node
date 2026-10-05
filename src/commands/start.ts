import type { Bot } from "node-telegram-bot-api";
import { privateChatTypes, verificationUrl } from "../config/telegram.js";
import { verifyUser } from "../services/verificationService.js";

export function registerStartCommand(bot: Bot): void {
    bot.command("start", async (ctx) => {
        if (!ctx.from || !ctx.chat || !privateChatTypes.has(ctx.chat.type)) {
            await ctx.reply("Please open this bot in a private chat to verify.");
            return;
        }

        if (ctx.match !== "verify") {
            await ctx.reply(`Greetings! I'm a testbot without much functionality as of right now!`);
            return;
        }

        const firstName = ctx.from.first_name;

        await verifyUser(ctx.from);

        await ctx.reply(
            `Welcome, ${firstName}! Your account is verified. You can now send messages in protected groups.`,
        );
    });
}