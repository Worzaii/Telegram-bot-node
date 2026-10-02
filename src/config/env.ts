import dotenv from "dotenv";

dotenv.config();

const requiredEnvironment = [
    "BOT_TOKEN",
    "BOT_USERNAME",
    "MYSQL_DATABASE",
    "MYSQL_USER",
    "MYSQL_PASSWORD",
    "MYSQL_DIALECT"
] as const;

for (const name of requiredEnvironment) {
    console.log(`Checking ${name}`)
    if (!process.env[name]) {
        throw new Error(`Missing required environment variable: ${name}`);
    }
}

export const env = {
    botToken: process.env.BOT_TOKEN!,
    botUsername: process.env.BOT_USERNAME!,
};
export const db = {
    host: process.env.MYSQL_HOST ?? "127.0.0.1",
    port: Number(process.env.MYSQL_PORT ?? 3306),
    database: process.env.MYSQL_DATABASE!,
    username: process.env.MYSQL_USER!,
    password: process.env.MYSQL_PASSWORD!,
    dialect: process.env.MYSQL_DIALECT ?? "mysql",
}
