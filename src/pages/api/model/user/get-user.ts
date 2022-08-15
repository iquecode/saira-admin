import type { NextApiRequest, NextApiResponse } from 'next'
import { authVerify } from '../../auth/lib/authVerify';
import { client } from '../../lib/prisma/client';
import { sanitizeInputs, sanitizeObjectReq } from '../../lib/util';
import requestIp from 'request-ip'
import { getUser, updateUserWithDataForm } from './helper';

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
            const userIdLogin = await authVerify(jwt);
            if(!userIdLogin) {
                return res.json({ error:"Invalid token!" , message: "Invalid token!", success:false })
            }

            const {id}:any =  sanitizeInputs(req.body);

            
            const user = await getUser(id); 
            //const data =  sanitizeInputs(req.body.data);
            //const userUpdate     = await updateUserWithDataForm(userId as string,data);
            return res.status(200).json({success: true, user});

        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

}