import type { NextApiRequest, NextApiResponse } from 'next'
import { getFromState } from './helpers';


export default handler;

function handler(req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case 'GET':

            //console.log(req.query);
            const stateId  = parseInt(req.query.stateId as string);
            if (!stateId) {
                res.status(405).end(`params requerid`);
            }
            return getCities(stateId);
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function getCities(stateId: number) {
        const cities = await getFromState(stateId);
        return res.json(cities);
    }
}