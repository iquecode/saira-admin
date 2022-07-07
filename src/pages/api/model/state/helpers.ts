import { client } from '../../lib/prisma/client';

export async function getAll()   {
        const states = client.state.findMany({
            select: {
                id: true,
                name: true,
                uf: true,
            }
        });
        return states;
}