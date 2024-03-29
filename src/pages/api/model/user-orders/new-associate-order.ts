import type { NextApiRequest, NextApiResponse } from 'next'
import { authVerify } from '../../auth/lib/authVerify';
import { client } from '../../lib/prisma/client';
import { sanitizeInputs, sanitizeObjectReq } from '../../lib/util';
import DOMPurify from 'isomorphic-dompurify';
import { createUserOrderAssociate } from './helper';
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
           
            const data =  sanitizeInputs(req.body.data);
            //const data = req.body;
            //console.log('backend data:');
            //console.log(data);
            const userUpdate     = await updateUserWithDataForm(userId as string,data);
            const orderAssociate = await createUserOrderAssociate(userUpdate, detectedIp, dispositive);
            //const dataOrderAssociate = await createDataOrderAssociate(orderAssociate);
            //const orderAssociate = data;
            return res.status(200).json({success: true, orderAssociate});

        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    
}