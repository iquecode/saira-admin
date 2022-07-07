import type { NextApiRequest, NextApiResponse } from 'next'
import { getAll } from './helpers';


export default handler;

function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            return getCountries();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function getCountries() {
        const countries = await getAll();

        //const c = {a: "brasil"};
        
        //return c;


        return res.json(countries);
        //return res.status(200).json({countries:"Brasil"});
    }
}