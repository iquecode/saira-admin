/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next'
import { hash } from 'bcryptjs';
import { client } from '../lib/prisma/client';
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import { validateSignUp, sanitizeInputs } from '../lib/util';


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
    return res.status(200).json({user: {id: user.id, email: user.email}});
    
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