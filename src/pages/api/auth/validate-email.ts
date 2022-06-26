import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../lib/prisma/client';
import { sanitizeInputs } from '../lib/util';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  
  const {token} :any = sanitizeInputs(req.body);
  
  console.log('dasdsfsfs: ' + token);

  const tokenTimeGenerated = token.split('@@')[0];
  const duration = 60 * 60 * 24; //24 horas

  if ( Math.floor(Date.now() / 1000) > tokenTimeGenerated + duration ) {
    res.json({cod:'expired', msg:'token expirado'});
  }


  try {

    const user = await client.user.findUnique({
      where: {
        tokenEmailVerify: token,
      },
    })

    if(!user) res.json({email: null, msg:'email não encontrado'});
   
    
    
   
    const userValidated = await client.user.update({
      where: {
        id: user.id,
      },
      data: {
        tokenEmailVerify: null,
        tokenSignUpFlow: null,
        emailVerified: true,
      }
    })
    res.json({email: userValidated.email});

  } catch (error) {
     res.json({error: error.message});
  }  
  
}