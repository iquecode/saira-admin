import type { NextApiRequest, NextApiResponse } from 'next'
import { authVerify } from '../../auth/lib/authVerify';
import { client } from '../../lib/prisma/client';
import { sanitizeInputs, sanitizeObjectReq } from '../../lib/util';
import DOMPurify from 'isomorphic-dompurify';
import { ConfirmAssociateOrder, createUserOrderAssociate } from './helper';
import requestIp from 'request-ip'
import { updateUserWithDataForm } from '../user/helper';


export default handler;


async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            const { cookies } = req;
            const detectedIp = requestIp.getClientIp(req);
            const dispositive = req.headers['user-agent'];
            
            const jwt = cookies.OursiteJWT;
            if (!jwt) {
            return res.json({ error:"Invalid token!" , message: "Invalid token!", success:false });
            }
            const userId = await authVerify(jwt);
            if(!userId) {
                return res.json({ error:"Invalid token!" , message: "Invalid token!", success:false })
            }
          
            //const data = req.body;
           
            const {userIdFromOrder, orderId}: any =  sanitizeInputs(req.body);
            //const data = req.body;
            //console.log('backend data:');
            //console.log(data);
            const associateUpdate = await ConfirmAssociateOrder(userIdFromOrder, userId as string, orderId, detectedIp, dispositive );
            //const orderAssociate = await createUserOrderAssociate(userUpdate, detectedIp, dispositive);
            //const dataOrderAssociate = await createDataOrderAssociate(orderAssociate);
            //const orderAssociate = data;

            const {error, order, user} = associateUpdate;

            if (error) {
                return  res.status(200).json({error: error, message: error, success: false});
            }

            return res.status(200).json({success: true, order, user});

        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    
}