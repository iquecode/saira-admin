import { client } from '../../lib/prisma/client';

export async function getFromState(stateId: number)   {
        const cities = client.city.findMany({
            where: {
                stateId,
            },
            select: {
                id: true,
                name: true,
            }
        });
        return cities;
}