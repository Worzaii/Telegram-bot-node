import {Bot, InlineKeyboardBuilder} from "node-telegram-bot-api";
import {run} from "node-telegram-bot-api/node"; // managed runner: wires Ctrl-C to bot.stop()
import dotenv from "dotenv";

dotenv.config();

const bot = new Bot(process.env.BOT_TOKEN!);

const admins = [129430675,];

// ⏱️ time every update - and catch anything thrown downstream
bot.use(async (ctx, next) => {
    const start = Date.now();
    try {
        await next();
    } finally {
        console.log(`update took ${Date.now() - start}ms`);
        console.dir(ctx.from)
        console.dir(ctx);
    }
});

bot.command("amiadmin", (ctx) => {
    if(ctx.from && admins.includes(ctx.from.id)) {
        return ctx.reply('Yes you\'re an admin.')
    } else {
        return ctx.reply("No you\'re not an admin.");
    }
});

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
    await ctx.answerCallbackQuery({text: `You tapped ${ctx.callbackQuery!.data}`});
});

// 🧯 last-resort error handler
bot.catch((err, ctx) => console.error("handler failed", err));
await run(bot); // core-only alternative that runs anywhere: await bot.startPolling()