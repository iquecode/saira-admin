import { IncomingForm } from 'formidable';
import sharp from 'sharp';
import type { NextApiRequest, NextApiResponse } from 'next'
import {authVerify} from '../auth/lib/authVerify';
import { client } from '../lib/prisma/client';


export const config = {
    api: {
       bodyParser: false,
    }
};
 
export default async (req: NextApiRequest, res: NextApiResponse) => {

    const { cookies } = req;

    const jwt = cookies.OursiteJWT;
    if (!jwt) {
       return res.json({ error:"Invalid token!" , message: "Invalid token!", success:false });
    }

    const userId = await authVerify(jwt);
    if(!userId) {
        return res.json({ error:"Invalid token!" , message: "Invalid token!", success:false })
    }

    
    const form = new IncomingForm()
    
    form.parse(req, async (err, fields, files) => {
        if (err) return res.json({ error:"Invalid parse file!" , message: "Invalid parse file!", success:false })
        console.log(fields, files)
        //console.log('path2..:'+ files.file2.filepath);
        //@ts-ignore
        const oldPath = files.file.filepath;
        //const newPath = `./public/uploads/${Date.now()}file.webp`;
        const newPath = `./src/storage/documentUsersImages/${userId}--1photodocument.webp`;

        //@ts-ignore
        const oldPath2 = files.file2.filepath;
        //const newPath2 = `./public/uploads/${Date.now()}file2.webp`;
        const newPath2 = `./src/storage/documentUsersImages/${userId}--2photodocument.webp`;

        sharp(oldPath)
            .resize({fit: sharp.fit.contain, width:400})
            .toFormat('webp')
            .webp({quality:85})
            .toFile(newPath);

        sharp(oldPath2)
            .resize({fit: sharp.fit.contain, width:400})
            .toFormat('webp')
            .webp({quality:85})
            .toFile(newPath2);

        const userUpdate = await client.user.update({
            where: {
                id: <string>userId ,
            },
            data: {
                documentPhotoURL1: newPath,
                documentPhotoURL2: newPath2, 
            },
            });
        if(!userUpdate) {
            return res.json({ error:"error store db!" , message: "error store db!", success:false })
        }
        res.status(200).json({success:true, teste:'isso é um teste'})
            
    })
        
}
