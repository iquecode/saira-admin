import type { NextApiRequest, NextApiResponse } from 'next'
import { getAll, getState, getStateUf } from './helpers';


export default handler;

function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            const stateId  = parseInt(req.query.stateId as string);
            const uf  =      req.query.uf as string;
            if (stateId) {
                return getStates(stateId);
            }
            if (uf) {
                return getStateUf(uf);
            }
            
            return getStates();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    async function getStates(stateId=null) {
        if(!stateId){
            const states = await getAll();
            return res.json(states);
        } 
        const states = await getState(stateId);
        return res.json(states);
    }
}