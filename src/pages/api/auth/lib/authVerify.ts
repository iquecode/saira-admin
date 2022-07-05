import json from 'jsonwebtoken';
import { client } from '../../lib/prisma/client'
import { compare } from 'bcryptjs';

export async function authVerify(jwt: string):Promise<boolean | string> {
    const data = json.verify(jwt, process.env.SECRET);
    //return res.json({ data: "Top secret data!" });
    const tokenData = JSON.parse(JSON.stringify(data));  
    const tokenDB = await client.tokenHash.findUnique({
       where: {
         id: tokenData.id,
       },
    });
    if (!tokenDB) {
      return false;
    }
    //compara o jwt com o tokenDB.hash
    const tokenMatch = await compare(jwt, tokenDB?.hash);
    if (!tokenMatch) {
      return false;
    }
    return tokenDB.userId;
  }