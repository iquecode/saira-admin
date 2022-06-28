/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../lib/prisma/client';
import { sanitizeInputs, sendMail, generateMessageToSendMail } from '../lib/util';
import { v4 as uuidv4 } from 'uuid';


const secret = process.env.SECRET;

export default async function (req: NextApiRequest, res: NextApiResponse) {

  const { email }:any = sanitizeInputs(req.body);
  

  try {


    const user = await client.user.findUnique({
      where: {
        email,
      },
    });

    if(!user) {
        return res.json({cod: 'notfound', email});
    }

    const now = Math.floor(Date.now()/1000);
    const tokenResetPassword = `${now}${'@@'}${uuidv4()}`; 
    const userUpdate = await client.user.update({
      where: {
        email,
      },
      data: {
        tokenResetPassword,
      }
    });


    let template = await generateMessageToSendMail('reset-password.html');
    template = template.replace('{LINK}', process.env.DOMAIN+'/other/reset-password/'+tokenResetPassword);
    template = template.replace('{EMAIL}', userUpdate.email);
    const emailSended = await sendMail('mailer@institutosaira.org',userUpdate.email,
               'Instituto Saíra - redefinição de senha', template );
    // sendMailNodeMailer('mailer@institutosaira.org',userUpdate.email,
    //      'Instituto Saíra - validação de conta', template );
    return res.json({cod: 'success', email});
    
  } catch (error) {
    return res.json({cod: 'error', error: error.message, email});
  }  
  
}