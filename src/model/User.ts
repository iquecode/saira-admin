import { User } from "@prisma/client";

export interface UserNormalized extends User  {
    circles: [],
    roles: [],
    orders: [],
}