import { client } from '../../lib/prisma/client';

export async function getFromState(stateId: number)   {
        const cities = await client.city.findMany({
            where: {
                stateId,
            },
            select: {
                id: true,
                name: true,
                stateId: true,
            }
        });
        return cities;
}


export async function getFromUf(uf: string)   {
    const stateId = await client.state.findFirst({
        where: {uf},
        select: {id:true},
    });
    const cities = getFromState(stateId.id)
    return cities;
}

