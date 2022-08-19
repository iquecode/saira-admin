import type { NextApiRequest, NextApiResponse } from 'next'
import { authVerify } from '../../auth/lib/authVerify';
import { client } from '../../lib/prisma/client';
import { sanitizeInputs, sanitizeObjectReq } from '../../lib/util';
import DOMPurify from 'isomorphic-dompurify';
import { getAssociateOrders, getOrder } from './helper';
import requestIp from 'request-ip'


export default handler;


async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            const { cookies } = req;
            const {orderId}:any =  sanitizeInputs(req.body);
            const detectedIp = requestIp.getClientIp(req);
            const dispositive = req.headers['user-agent'];

            
            
            const jwt = cookies.OursiteJWT;
            if (!jwt) {    
            return res.status(401).json({ error:"Invalid token!" , message: "Invalid token!", success:false });
            }
            const userIdSignIn = await authVerify(jwt);
            if(!userIdSignIn) {
                return res.status(401).json({ error:"Invalid token!" , message: "Invalid token!", success:false })
            }
            //const data = req.body;
            const {order, sucess, error} = await getOrder(orderId, userIdSignIn as string);

            if(error) {
                return res.status(401).json({ error, message: error, success:false })
            }
            
            return res.status(200).json({success: true, order});

        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    
}