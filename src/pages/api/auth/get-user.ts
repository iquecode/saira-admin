/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next'
import a from 'jsonwebtoken';
import { client } from '../lib/prisma/client'
import { compare } from 'bcryptjs';

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { cookies } = req;
  
    const jwt = cookies.OursiteJWT;
  
    if (!jwt) {
      return res.json({ message: "Invalid token!" });
      
    }
  
    const data = a.verify(jwt, process.env.SECRET);
    //return res.json({ data: "Top secret data!" });
    const tokenData = JSON.parse(JSON.stringify(data));  


    const tokenDB = await client.tokenHash.findUnique({
       where: {
         id: tokenData.id,
       },
    });


    //compara o jwt com o tokenDB.hash
    const tokenMatch = await compare(jwt, tokenDB.hash);

    const match = tokenMatch ? 'COMPARAÇÃO BEM SUCEDIDA' : 'COMPARAÇÃO SEM SUCESSO';
    //console.log(tokenHashReg.hash);



    //return res.json({ data: data, match });
    return res.json({ jwt, data, match });

    
    //return res.json({ data: jwt });
  }