import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../lib/prisma/client';
import { sanitizeInputs } from '../lib/util';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  
  const {token} :any = sanitizeInputs(req.body);
  
  console.log('dasdsfsfs: ' + token);
  try {

    const user = await client.user.findUnique({
      where: {
        tokenEmailVerify: token,
      },
    })

    if(!user) res.json({email: null, msg:'email não encontrado'});
    res.json({email: user.email});

  } catch (error) {
     res.json({error: error.message});
  }  
  
}