import nodemailer from 'nodemailer';
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    
    


    
    
        const transport = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.SMTP_USER, // generated ethereal user
              pass: process.env.SMTP_PASS, // generated ethereal password
            },
          });

        // let transport = nodemailer.createTransport({
        //     host: process.env.SMTP_HOST,
        //     port: Number(process.env.SMTP_PORT),
        //     auth: {
        //       user: process.env.SMTP_USER,
        //       pass: process.env.SMTP_PASS
        //     }
        //   });
    
        const message = {
            from: 'mailer@institutosaira.org',
            to: 'hemariani@gmail.com',
            subject: 'teste de assunto',
            text: 'msg de texto puro',
            html: '<h1>msg html com tag h1</h1>',
        };
    
        transport.sendMail(message, function (err) {
            if (err) res.status(200).json({ msg: err })
                else   res.status(200).json({ msg: 'email enviado' })
        }) 
    
      
    
        
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    














}