/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next'
import { compare } from 'bcryptjs';
import { client } from '../lib/prisma/client';
import { sanitizeInputs, sendMail } from '../lib/util';
import { generateTokenAndSaveInDB } from './lib/functions';
import { normalizedUser } from './lib/normalizedUser';
import { string } from 'yup';
import { hash } from 'bcryptjs';


const secret = process.env.SECRET;

export default async function (req: NextApiRequest, res: NextApiResponse) {
  

  console.log('req...Aqui: ' + req.body.data);
  const {tokenResetPassword, password}:any = sanitizeInputs(req.body);
  
  const duration:number = 60 * 60 * 24 //24 horas;
  const expiration:number = parseInt(tokenResetPassword.split('@@')[0]) + duration;
  if(Math.floor(Date.now()/1000) > expiration) {
    return res.json({ cod:'expired', message: "Link expirado."});
  }

  try {    
    const user = await client.user.findUnique({
      where: {
        tokenResetPassword,
      },
    });

    if(!user) {
      return res.json({ cod:'notfound', message: "Usuário não encontrado."});
    }

    const passwordHash = await hash(password, 8);
    const userUpdate = await client.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: passwordHash,
        tokenResetPassword: null, 
        emailVerified: true,
        loginAttempts: 0,
        loginBlocked: false,
        loginBlockedReason: null,
      },
   });

   if (userUpdate) {
    return res.json({ cod:'success', message: "Senha redefinida com sucesso. Você já pode fazer o login com a nova senha."});
   }
   else {
    res.json({ cod:'error_update', message: "Erro no banco de dados."});
   }

  } catch (error) {
    return res.json({cod: 'error', error: error.message});
  }  

    
}