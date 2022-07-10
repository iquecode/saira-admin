import { User } from "@prisma/client";

export interface UserNormalized extends User  {
    circles: [],
    roles: [],
    orders: [],
    city: {
        id: number,
        name: string,
        state: {
            id: number,
            name: string,
            uf: string,
        }
    }
}