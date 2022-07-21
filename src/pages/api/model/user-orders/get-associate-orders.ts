import type { NextApiRequest, NextApiResponse } from 'next'
import { authVerify } from '../../auth/lib/authVerify';
import { client } from '../../lib/prisma/client';
import { sanitizeInputs, sanitizeObjectReq } from '../../lib/util';
import DOMPurify from 'isomorphic-dompurify';
import { createUserOrderAssociate, getAssociateOrders, updateUserWithDataForm } from './helper';
import requestIp from 'request-ip'


export default handler;


async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'GET':
            const { cookies } = req;
            const detectedIp = requestIp.getClientIp(req);
            const dispositive = req.headers['user-agent'];

            const take  = req.query.take ? parseInt(req.query.take as string) : 10;
            const skip  = req.query.skip ? parseInt(req.query.skip as string) : 0;
            
            const jwt = cookies.OursiteJWT;
            if (!jwt) {
            return res.json({ error:"Invalid token!" , message: "Invalid token!", success:false });
            }
            const userId = await authVerify(jwt);
            if(!userId) {
                return res.json({ error:"Invalid token!" , message: "Invalid token!", success:false })
            }
            //const data = req.body;
            const {associateOrders, total} = await getAssociateOrders(skip, take);
            
            return res.status(200).json({success: true, associateOrders, total});

        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    
}