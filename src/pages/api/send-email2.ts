import nodemailer from 'nodemailer';
import type { NextApiRequest, NextApiResponse } from 'next'
import { apiSSR } from '../../services/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    apiSSR.defaults.headers['accept'] = 'application/json';
    apiSSR.defaults.headers['api-key'] = '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';
    apiSSR.defaults.headers['content-type'] = 'application/json';

    const data = {
        sender: {
            name: 'Instituto Saíra',
            email: 'mailer@institutosaira.org', 
        },
        to: [
            {
                email: 'iquecode@gmail.com',
                name: 'ique',
            }
        ],
        subject: 'DEU CERTOteste de assunto',
       htmlContent: '<h1>CEU CERTO Conteúdo do email... </h1>',  
    }
    //const { sender, to, subject, htmlContent } = data;


    // const response = await apiSSR.post('https://api.sendinblue.com/v3/smtp/email',
    //     {sender: data.sender, to: data.to, subject: data.subject, htmlContent: data.htmlContent}  );


        // const response = await apiSSR.post('https://api.sendinblue.com/v3/smtp/email',
        // {data } );  
        
        const response = await apiSSR.post('https://api.sendinblue.com/v3/smtp/email',
        {sender: data.sender, to: data.to, subject:data.subject, htmlContent: data.htmlContent, } );
    console.log('*****data :' + response);
    res.status(200).json( response.data);

}
    

