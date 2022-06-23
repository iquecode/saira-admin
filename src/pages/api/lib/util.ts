import DOMPurify from 'isomorphic-dompurify';
import { client } from '../lib/prisma/client';
import nodemailer from 'nodemailer';


export const validateSignUp = async ( email: string, password: string, passwordConfirm: string) =>  {
    //Validação com Yup e React hook form no front end... aqui apenas sanitização e validação sensível para o backend
    const reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(email)) return { validated: false, msg: 'Email inválido' }; 
    if (password != passwordConfirm) return { 
        validated: false, 
        msg: 'Senha e Confirmação de senha não conferem',
        password,
        passwordConfirm 
    };
    if (password.length < 8) return { validated: false, msg: 'Senha deve ter no mínimo 8 caracteres' };
    const userAlreadExists = await client.user.findUnique({
        where: {
            email
        }
    });
    if (userAlreadExists) return {validated: false, msg: 'email de usuário já existente'};
    return {validated: true, msg: 'signup data validated'};
}

export const validateSignIn = async ( email: string, password: string, passwordConfirm: string) =>  {
    
}


export const sanitizeInputs = (inputs:{}) => {
    let sanitizedInputs = {};
    for (const [key, value] of Object.entries<string | Node>(inputs)) {
        sanitizedInputs[key] = DOMPurify.sanitize(value);
        //console.log(key + ' ' + value);
      }
    return sanitizedInputs;
}


export async function sendMail(from: string, to: string, subject: string, html?:string, text?:string) {


    
    
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_USER,
        port: Number(process.env.SMTP_PORT),
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.SMTP_USER, // generated ethereal user
          pass: process.env.SMTP_PASS, // generated ethereal password
        },
      });

    const message = {
        from,
        to,
        subject,
        text,
        html,
    };

    transporter.sendMail(message, function (err) {
        if (err) return false
    });

    return true;
}
