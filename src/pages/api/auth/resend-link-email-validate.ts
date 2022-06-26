/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next'
import { client } from '../lib/prisma/client';
import { sanitizeInputs, sendMail, generateMessageToSendMail, sendMailNodeMailer } from '../lib/util';
import { v4 as uuidv4 } from 'uuid';


const secret = process.env.SECRET;

export default async function (req: NextApiRequest, res: NextApiResponse) {

  const { tokenSignUpFlow }:any = sanitizeInputs(req.body);
  

  try {


    const user = await client.user.findUnique({
      where: {
        tokenSignUpFlow,
      },
    });

    const now = Math.floor(Date.now()/1000);
    const newtokenEmailVerify = `${now}${'@@'}${uuidv4()}`; 
    const newTokenSignUpFlow  = `${now}${'@@'}${uuidv4()}`;
    const userUpdate = await client.user.update({
      where: {
        tokenSignUpFlow,
      },
      data: {
        tokenSignUpFlow: newTokenSignUpFlow,
        tokenEmailVerify: newtokenEmailVerify,
      }
    });
    let template = await generateMessageToSendMail();
    template = template.replace('{LINK}', process.env.DOMAIN+'/sign-up-flow/validate-email/'+newtokenEmailVerify);
    template = template.replace('{EMAIL}', userUpdate.email);
    const emailSended = await sendMail('mailer@institutosaira.org',userUpdate.email,
               'Instituto Saíra - validação de conta', template );
    // sendMailNodeMailer('mailer@institutosaira.org',userUpdate.email,
    //      'Instituto Saíra - validação de conta', template );
    return res.status(200).json({tokenSignUpFlow: userUpdate.tokenSignUpFlow});
    
  } catch (error) {
    return res.json({error: error.message});
  }  
  
}