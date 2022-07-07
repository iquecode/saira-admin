import { client } from '../../lib/prisma/client';

export async function getAll()   {
        const states = await client.state.findMany({
            select: {
                id: true,
                name: true,
                uf: true,
            }
        });
        return states;
}

export async function getState(stateId:number)   {
    const state = await client.state.findUnique({
        where: {
            id: stateId,
        },
        select: {
            id: true,
            name: true,
            uf: true,
        }
    });
    return state;
}

export async function getStateUf(uf:string)   {
    const state = await client.state.findUnique({
        where: {
            uf,
        },
        select: {
            id: true,
            name: true,
            uf: true,
        }
    });
    return state;
}