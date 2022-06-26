/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next'
import { hash } from 'bcryptjs';
import { client } from '../lib/prisma/client';
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { validateSignUp, sanitizeInputs, sendMail, generateMessageToSendMail } from '../lib/util';
import { v4 as uuidv4 } from 'uuid';




import DOMPurify from 'dompurify';
import { TypeScriptConfig } from 'next/dist/server/config-shared';

const secret = process.env.SECRET;

// type AuthDataProps = {
//   email: string,
//   password: string,
//   passwordConfirm: string,
// }

export default async function (req: NextApiRequest, res: NextApiResponse) {
  //const { email, password, passwordConfirm } = req.body;
  //const sanitizedData:any = sanitizeInputs(req.body);
  //const { email, password, passwordConfirm } = sanitizedData;
  const { email, password, passwordConfirm }:any = sanitizeInputs(req.body);
  //console.log(req.body)
  //const e = DOMPurify.sanitize();
  //return res.status(200).json(sanitizedData);
  const validate = await validateSignUp(email, password, passwordConfirm);  
  if (!validate.validated) 
    return res.json(validate);

  try {


    


    const passwordHash = await hash(password, 8);
    const user = await client.user.create({
        data: {
            email,
            password: passwordHash,
        }
    })

    if(!user) throw new Error('Erro no banco de dados. Tente novamente em instantes!');
    
    const now = Math.floor(Date.now());
    const tokenEmailVerify = `${now}${'@@'}${uuidv4()}`; 
    const tokenSignUpFlow  = `${now}${'@@'}${uuidv4()}`;
    const userUpdate = await client.user.update({
      where: {
        id: user.id,
      },
      data: {
        tokenEmailVerify,
        tokenSignUpFlow,
      },
    });

    //const msg = generateMessageToSendMail('validate.html'); 
    
    let template = await generateMessageToSendMail();
    template = template.replace('{LINK}', process.env.DOMAIN+'/sign-up-flow/validate-email/'+tokenEmailVerify);
    template = template.replace('{EMAIL}', userUpdate.email);
    

    sendMail('mailer@institutosaira.org',user.email,
              'Instituto Saíra - validação de conta', template );

    return res.status(200).json({user: {id: userUpdate.id, email: userUpdate.email, tokenSignUpFlow: userUpdate.tokenSignUpFlow}});
    
  } catch (error) {
    return res.json({error: error.message});
  }  
  


  


  // Check in the database
  // if a user with this username
  // and password exists
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