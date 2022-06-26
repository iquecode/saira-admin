import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../lib/prisma/client';
import { sanitizeInputs } from '../lib/util';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  
  const {tokenSignUpFlow} :any = sanitizeInputs(req.body);
  
  //console.log('dasdsfsfs: ' + token);
  try {

    const user = await client.user.findUnique({
      where: {
        tokenSignUpFlow,
      },
    })

    if(!user) res.json({msg:'email não encontrado'});

    const duration = 60 * 60 *24 //24 horas;
    const tokenEmailVerifyExpiration = user.tokenEmailVerify.split('@@')[0] + duration;

    res.json({email: user.email, tokenEmailVerifyExpiration });

  } catch (error) {
     res.json({error: error.message});
  }  
  
}