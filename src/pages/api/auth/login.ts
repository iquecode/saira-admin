/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next'
import { compare } from 'bcryptjs';
import { client } from '../lib/prisma/client';
import { sanitizeInputs } from '../lib/util';
import { generateTokenAndSaveInDB } from './lib/functions';

const secret = process.env.SECRET;

export default async function (req: NextApiRequest, res: NextApiResponse) {
  
  const { email, password }:any = sanitizeInputs(req.body);
  // Check in the database
  // if a user with this username
  // and password exists

  try {    
    const user = await client.user.findUnique({
      where: {
        email: email,
      },
      include: {
         circles: true,
         roles: true,
      },
    });

    if(!user) throw new Error("User or password incorrect");
    const passwordMatch = await compare(password, user.password);
    if(!passwordMatch) {
      //colocar no banco de dados uma tentativa a mais de login
      //se tentativas chegarem no limite - 5 - bloquear usuário por 1 hora?
      //usuário pode redefinir senha e receber email e caso redefina, fica zerado
      
      // verificar se está é a 5ª tentativa de login errada 
      // se for, bloquear usuário por 1 hora
      if ( user.loginAttempts >= 4 ) {

        const updateUser = await client.user.update({
          where: {
            id: user.id,
          },
          data: {
            loginBlocked: true,
            loginBlockedDate: Date.now() + 60*60*30,  //30minutos
            loginAttempts: 0,
          },
        });
      }
      throw new Error("User or password incorrect");
    }

    const tokenSerialised = await generateTokenAndSaveInDB(user.id, req.headers['user-agent']);
    res.setHeader("Set-Cookie", tokenSerialised);

    user.password = undefined;
    res.status(200).json({ message: "Login ok", user:user, tokenSerialised });

  } catch (error) {
    return res.json({error: error.message});
  }  

    
}