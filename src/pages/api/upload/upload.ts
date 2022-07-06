import { IncomingForm } from 'formidable';
import sharp from 'sharp';
import type { NextApiRequest, NextApiResponse } from 'next'
import {authVerify} from '../auth/lib/authVerify';
import { client } from '../lib/prisma/client';


// export const config = {
//     api: {
//        bodyParser: false,
//     }
// };
 
export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { cookies } = req;

    

    const { documentPhotoURL1, documentPhotoURL2} = req.body;

    const jwt = cookies.OursiteJWT;
    if (!jwt) {
       return res.json({ error:"Invalid token!" , message: "Invalid token!", success:false });
    }

    const userId = await authVerify(jwt);
    if(!userId) {
        return res.json({ error:"Invalid token!" , message: "Invalid token!", success:false })
    }


    const userUpdate = await client.user.update({
        where: {
            id: <string>userId ,
        },
        data: {
            documentPhotoURL1,
            documentPhotoURL2,
        },
        });
    if(!userUpdate) {
        return res.json({ error:"error store db!" , message: "error store db!", success:false })
    }
    res.status(200).json({success:true, teste:'isso é um teste'})
        
}
