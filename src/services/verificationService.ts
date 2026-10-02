import VerifiedUser from "../models/VerifiedUser.js";

export async function isVerified(telegramUserId: number): Promise<boolean> {
    return (
        await VerifiedUser.count({
            where: {
                telegramUserId: String(telegramUserId),
            },
        })
    ) > 0;
}

export async function verifyUser(user: {
    id: number;
    username?: string;
    first_name: string;
}): Promise<void> {
    await VerifiedUser.upsert({
        telegramUserId: String(user.id),
        username: user.username ?? null,
        firstName: user.first_name,
        verifiedAt: new Date(),
    });
}