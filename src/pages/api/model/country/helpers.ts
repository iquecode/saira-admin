import { client } from '../../lib/prisma/client';

export async function getAll()   {
        const countries = client.country.findMany({
            select: {
                id: true,
                namePt: true,
            }
        });
        return countries;
}