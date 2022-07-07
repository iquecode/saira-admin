import type { NextApiRequest, NextApiResponse } from 'next'
import { getAll } from './helpers';


export default handler;

function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            return getStates();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function getStates() {
        const states = await getAll();
        return res.json(states);
    }
}