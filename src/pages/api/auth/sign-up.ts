/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next'
import { hash } from 'bcryptjs';
import { client } from '../lib/prisma/client';
import { validateSignUp, sanitizeInputs, sendMail, generateMessageToSendMail, sendMailNodeMailer } from '../lib/util';
import { v4 as uuidv4 } from 'uuid';

export default async function (req: NextApiRequest, res: NextApiResponse) {
  // const email = 'iquecode@gmail.com';
  // const password = '12345678';
  // const passwordConfirm = '12345678';

  const { email, password, passwordConfirm }:any = sanitizeInputs(req.body);
  const validate = await validateSignUp(email, password, passwordConfirm);  
  if (!validate.validated) 
    return res.json(validate);
  
  try {
    const passwordHash = await hash('12345678', 8);
    const user = await client.user.create({
        data: {
            email: 'iquecode@gmail.com',
            password: passwordHash,
        }
    })

    if(!user) throw new Error('Erro no banco de dados. Tente novamente em instantes!');
    
    const now = Math.floor(Date.now()/1000);
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

    let template = await generateMessageToSendMail();
    template = template.replace('{LINK}', process.env.DOMAIN+'/sign-up-flow/validate-email/'+tokenEmailVerify);
    template = template.replace('{EMAIL}', userUpdate.email);
    
    const emailSended = await sendMail('mailer@institutosaira.org',user.email,
               'Instituto Saíra - validação de conta', template );
    
    // sendMailNodeMailer('mailer@institutosaira.org',user.email,
    //                     'Instituto Saíra - validação de conta', template );

    //return res.status(200).json({user: {id: userUpdate.id, email: userUpdate.email, tokenSignUpFlow: userUpdate.tokenSignUpFlow}});
    userUpdate.password = undefined;
    userUpdate.tokenEmailVerify = undefined;
    userUpdate.loginBlocked = undefined;
    userUpdate.loginAttempts = undefined;
    userUpdate.loginBlockedExpiration = undefined;
    userUpdate.loginBlockedReason = undefined;
    userUpdate.deletable = undefined;
    userUpdate.deleted = undefined;
    userUpdate.emailVerified = undefined;
    //userUpdate.tokenSignUpFlow = undefined;
    return res.status(200).json({user: userUpdate});

  } catch (error) {
    return res.json({error: error.message});
  }  
  
}