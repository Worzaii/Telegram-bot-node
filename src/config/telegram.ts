import { env } from "./env.js";

export const verificationUrl = `https://t.me/${env.botUsername.replace(/^@/, "")}?start=verify`;

export const privateChatTypes = new Set(["private"]);

export const protectedChatTypes = new Set(["group", "supergroup"]);