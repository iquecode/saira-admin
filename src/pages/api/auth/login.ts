/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next'
import { compare } from 'bcryptjs';
import { client } from '../lib/prisma/client';
import { sanitizeInputs, sendMail } from '../lib/util';
import { generateTokenAndSaveInDB } from './lib/functions';
import { normalizedUser } from './lib/normalizedUser';


const secret = process.env.SECRET;

export default async function (req: NextApiRequest, res: NextApiResponse) {
  
  const { email, password}:any = sanitizeInputs(req.body);
  //const { email, password} =req.body;
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
         orders: true,
      },
    });

    if(!user) throw new Error("Email ou senha incorretas.");

    let loginAttemptsNow = user.loginAttempts;

    if(user.loginBlocked && user.loginBlockedExpiration >= Math.floor(Date.now()/1000)) {
      throw new Error("Login bloqueado temporariamente por excesso de tentativas. Login bloqueado por excesso de tentativas. Espere 20 minutos para novo Login");
    }


    if(user.loginBlocked && user.loginBlockedExpiration < Math.floor(Date.now()/1000)) {
      const updateUser = await client.user.update({
        where: {
          id: user.id,
        },
        data: {
          loginBlocked: false,
          loginBlockedExpiration: null,
          loginAttempts: 0,
        },
      });
      loginAttemptsNow = 0;
    }


    const passwordMatch = await compare(password, user.password);
    if(!passwordMatch) {
      //colocar no banco de dados uma tentativa a mais de login
      //se tentativas chegarem no limite - 5 - bloquear usuário por 1 hora?
      //usuário pode redefinir senha e receber email e caso redefina, fica zerado
      
      const updateUser = await client.user.update({
        where: {
          id: user.id,
        },
        data: {
          loginAttempts: user.loginAttempts + 1,
        },
      });


      // verificar se está é a 5ª tentativa de login errada 
      // se for, bloquear usuário por 1 hora
      if ( user.loginAttempts >= 4 ) {

        const duration = 60*20;  //20 minutos
       
        const updateUser = await client.user.update({
          where: {
            id: user.id,
          },
          data: {
            loginBlocked: true,
            loginBlockedExpiration: Math.floor(Date.now() / 1000) + duration, 
            loginAttempts: 0,
          },
        });
        throw new Error("Email ou senha incorretas. Login bloqueado por excesso de tentativas. Espere 20 minutos para novo Login");
      }
      throw new Error("Email ou senha incorretas.");
    }


    //verificar se email foi verifiado
    //se não foi, enviar resposta com para o front com indicativo de envio para
    //a página de reenvio de link de validação
    if (!user.emailVerified) {
      return res.status(200).json({ cod:'unverified', message: "email unverified", user:user,});
    }

    if(loginAttemptsNow > 0) {
      const updateUser = await client.user.update({
        where: {
          id: user.id,
        },
        data: {
          loginAttempts: 0,
        },
      });
    }

    const tokenSerialised = await generateTokenAndSaveInDB(user.id, req.headers['user-agent']);
    res.setHeader("Set-Cookie", tokenSerialised);

    //user.password = undefined;


    //const testSendEmail = sendMail('mailer@institutosaira.org','iquecode@gmail.com', 'Teste de Assunto', '<h1>TesteHTML</h1>', 'Mensagem de testo');

    return res.status(200).json({ cod:'success', message: "Login ok", user:normalizedUser(user), tokenSerialised });

  } catch (error) {
    return res.json({cod: 'error', error: error.message});
  }  

    
}