/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next'
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { compare, hash } from 'bcryptjs';
import { client } from '../lib/prisma/client';
import { validateSignUp, sanitizeInputs } from '../lib/util';
import { v4 as uuidv4 } from 'uuid';


const secret = process.env.SECRET;

export default async function (req: NextApiRequest, res: NextApiResponse) {
  //const { email, password } = req.body;
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
      }
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

         let dt = new Date();
         dt.setHours( dt.getHours() + 1 );

        const updateUser = await client.user.update({
          where: {
            id: user.id,
          },
          data: {
            loginBlocked: true,
            loginBlockedDate: dt,
            loginAttempts: 0,
          },
        });
      }

    
      
      throw new Error("User or password incorrect");
    }



    const tokenHashRegister = await client.tokenHash.create({
      data: {
          hash: '0',
          userId: user.id,    
      }
     })

    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
        id: tokenHashRegister.id,
        //email: email,
      },
      secret
    );

    const serialised = serialize("OursiteJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialised);

    const pureStringToken = serialised.split(';')[0].split('=')[1];  
    const tokenHash = await hash(pureStringToken , 8);
    //const tokenHash = await hash(uuidv4(), 8);
    
    const updateTokenHashRegister = await client.tokenHash.update({
      where: {
        id: tokenHashRegister.id,
      },
      data: {
        hash: tokenHash,
        dispositive: req.headers['user-agent'],
      },
    });
    user.password = undefined;
    res.status(200).json({ message: "Login ok", user:user, serialised });

    
  

    






    //const passwordHash = await hash(password, 8);
    // const user = await client.user.create({
    //     data: {
    //         email,
    //         password: passwordHash,
    //     }
    // })
    //return res.status(200).json({user: {id: user.id, email: user.email}});
    
  } catch (error) {
    return res.json({error: error.message});
  }  









  if (email === "iquecode@gmail.com" && password === "1234") {
    const token = sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
        email: email,
      },
      secret
    );

    const serialised = serialize("OursiteJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialised);

    res.status(200).json({ message: "Success!" });
  } else {
    res.json({ message: "Invalid credentials!" });
  }
}