import { User } from "@prisma/client";

export function normalizedUser(user: User) {
    let normalized = user;
    normalized.password = undefined;
    normalized.deleted = undefined;
    normalized.tokenEmailVerify = undefined;
    normalized.tokenSignUpFlow = undefined;
    return normalized;
} 