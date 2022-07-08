import DOMPurify from 'isomorphic-dompurify';
import { client } from '../lib/prisma/client';
import nodemailer from 'nodemailer';
import path from 'path';
import { promises as fs } from 'fs';
import { apiSSR } from '../../../services/api';
import { sendError } from 'next/dist/server/api-utils';


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


export const sanitizeObjectReq = (obj:{}) => {
    let sanitizedInputs = {};

    for (const property in obj) {
        sanitizedInputs[property] = DOMPurify.sanitize(obj[property]);
        //console.log(key + ' ' + value);
      }
    return sanitizedInputs;
}


export function sendMailNodeMailer(from: string, to: string, subject: string, html?:string, text?:string) {


    
    
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
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
        if (err) return {status: 'erro', msg:'erro de envio' }
    });

    return {status: 'sucess', msg:'email enviado' };
}



export async function sendMail(from: string, to: string, subject: string, html?:string, text?:string) {

    // apiSSR.defaults.headers['accept'] = 'application/json';
    // apiSSR.defaults.headers['api-key'] = process.env.SENDBLUE_API_KEY;
    // apiSSR.defaults.headers['content-type'] = 'application/json';

    apiSSR.defaults.headers['accept'] = 'application/json';
    apiSSR.defaults.headers['api-key'] = process.env.SMTP_API_KEY;
    apiSSR.defaults.headers['content-type'] = 'application/json';

    const data = {
        sender: {
            name: 'Instituto Saíra',
            email: from,  
        },
        to: [
            {
                email: to,
                name: to,
            }
        ],
        subject:subject,
        htmlContent: html,  
    }
    //const { sender, to, subject, htmlContent } = data;


    const response = await apiSSR.post('https://api.sendinblue.com/v3/smtp/email',
        {sender: data.sender, to: data.to, subject:data.subject, htmlContent: data.htmlContent,});

    console.log('*****data :' + response)
    return {status: 'sucess', msg:'email enviado', resp: response.data };

}



export async function generateMessageToSendMail(file?:string):Promise<string>  {
    
    const fileTemplate = file ? file : 'validate.txt';
    const dirRelative = 'templatesEmail';
    const dir = path.resolve('./src', dirRelative);
    const fileWithDir = dir + '/' + fileTemplate;
    
    try {
        const data = await fs.readFile(fileWithDir, 'utf8');
        return data;
    } catch (error) {
        return error.message;
    }
       
}
