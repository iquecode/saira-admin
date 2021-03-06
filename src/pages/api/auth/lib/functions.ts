import { hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { client } from "../../lib/prisma/client";
import { serialize } from "cookie";
import { readFile } from 'fs';
import jsonwebtoken from 'jsonwebtoken';




export async function generateTokenAndSaveInDB(userId: string, dispositive: string)  {

    const secret = process.env.SECRET;

    const duration = 60 * 60 * 24 * 30; // 30 days   
    const expiration = Math.floor(Date.now() / 1000) + duration;    
    const tokenHashRegister = await client.tokenHash.create({
        data: {
            hash: '0',
            userId: userId,    
            expiration,
        }
       })

    
    const token = sign(
        {
          exp: expiration, 
          id: tokenHashRegister.id,
          userId: userId,
        },
        secret
      );
  
    const serialised = serialize("OursiteJWT", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: duration,
    path: "/",
    });
  
    const pureStringToken = serialised.split(';')[0].split('=')[1];  
    const tokenHash = await hash(pureStringToken , 8);
    
    const updateTokenHashRegister = await client.tokenHash.update({
    where: {
        id: tokenHashRegister.id,
    },
    data: {
        hash: tokenHash,
        dispositive: dispositive,
    },
    });  

    return serialised;

}


export function generateAutoDeleteToken() {
    const serialised = serialize("OursiteJWT", null, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: -1,
        path: "/",
      });
    return serialised;
}


export function generateMessageToSendMail() {
    readFile('/etc/passwd', (err, data) => {
        if (err) return false;
        return data;
    });
}




export const validateSignIn = async ( email: string, password: string, passwordConfirm: string) =>  {
    
}



export function validatePassword(password:string, length:number, patterToEscape:string[], 
                                 caseSensitivty: boolean, numericDigits: boolean):boolean  {


    if (password.length < length) {
        return false;
    }                
    
    if (caseSensitivty) {

        const hasUpperCase =  /[A-Z]/.test(password);
        const hasLowerCase =  /[a-z]/.test(password);
        const hasNumber = /[0-9]/.test(password);

        const patternsToEscape = [
            '123',
            '1234',
            '12345',
            '12345678',

            
    ]


    }




    return true;

}