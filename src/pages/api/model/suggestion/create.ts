import type { NextApiRequest, NextApiResponse } from 'next'
import { authVerify } from '../../auth/lib/authVerify';
import { sanitizeInputs, sanitizeObjectReq } from '../../lib/util';
import requestIp from 'request-ip'
import { createSuggestion } from './helper';


export default handler;

async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            const { cookies } = req;

            console.log(req.body);
            //return res.status(200).json({success: true, suggestion:true});

            
            
            const jwt = cookies.OursiteJWT;
            if (!jwt) {
            return res.json({ error:"Invalid token!" , message: "Invalid token!", success:false });
            }
            const userId = await authVerify(jwt);
            if(!userId) {
                return res.json({ error:"Invalid token!" , message: "Invalid token!", success:false })
            }
          
            const {type, description}:any =  sanitizeInputs(req.body);
          
            const suggestion     = await createSuggestion(userId as string, type, description );
            return res.status(200).json({success: true, suggestion});

        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

}