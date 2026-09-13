import { Bot, InlineKeyboardBuilder } from "node-telegram-bot-api";
import { run } from "node-telegram-bot-api/node"; // managed runner: wires Ctrl-C to bot.stop()
import dotenv from "dotenv";
dotenv.config();

const bot = new Bot(process.env.BOT_TOKEN!);

// commands, regex and update types are all middleware - registration order wins
bot.command("start", (ctx) => ctx.reply("Hi! Send me anything."));
bot.hears(/echo (.+)/, (ctx) => ctx.reply(ctx.match![1]!));

bot.on("message", (ctx) =>
    ctx.reply("Pick one:", {
        reply_markup: new InlineKeyboardBuilder()
            .text("👍", "up")
            .text("👎", "down")
            .build(),
    }),
);

// 🔘 a tapped inline button comes back as a callback_query
bot.on("callback_query", async (ctx) => {
    await ctx.answerCallbackQuery({ text: `You tapped ${ctx.callbackQuery!.data}` });
});

await run(bot); // core-only alternative that runs anywhere: await bot.startPolling()