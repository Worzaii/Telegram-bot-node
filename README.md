# Telegram verification bot

This bot only permits people to speak in groups after they verify in a direct
message using the bot's deep-link `/start` command.

## Setup

1. Create a MySQL database.
2. Copy the values below into `.env` (do not commit this file):

```env
BOT_TOKEN=your-token
BOT_USERNAME=your_bot_username
MYSQL_DATABASE=telegram_bot
MYSQL_USER=telegram_bot
MYSQL_PASSWORD=change-me
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
```

3. Install dependencies with `npm install`, then start with `npm run dev`.

Give the bot administrator permission to delete messages in each protected
group. When an unverified person sends a message, the bot deletes it and sends
them a private verification link. Telegram only lets bots message users after
the user has started the bot, so the bot also tries to show the link in the
group as a fallback.
