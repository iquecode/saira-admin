

import { User } from '@prisma/client';
import { ParsedUrlQueryInput } from 'querystring';
import { client } from '../../lib/prisma/client';
import { generateMessageToSendMail, sendMail } from '../../lib/util';

export async function updateUserWithDataForm(id:string, data:any)   {
        const {linkedin, github, instagram, facebook, whatsapp, telegram, alternativeEmail,
               cityId, stateId, countryId, documentTypeId,   
             ...dataUserFromForm} = data;
        let dataToUpdate = {...dataUserFromForm, 
                              country: { connect: {id:parseInt(countryId)}},
                              documentType: { connect: {id:parseInt(documentTypeId)}}
                            }
        if(countryId==33) { //Brasil
          dataToUpdate = {...dataToUpdate, city:{ connect: {id: parseInt(cityId)}} }
        }
                              
        const userUpdate = await client.user.update({
            where: {
                id,
            },
            data: dataToUpdate,
        });
        if(!userUpdate) {
            throw new Error("Erro ao realizar update dos dados do usuário na base de dados.");
        }
        let contacts = [];
        if (!!linkedin)  contacts.push({name: 'LinkedIn', value: linkedin, userId: id });
        if (!!alternativeEmail) contacts.push({name: 'Email alternativo', value: alternativeEmail, userId: id  });
        if (!!github)    contacts.push({name: 'GitHub',       value: github, userId: id  });
        if (!!instagram) contacts.push({name: 'Instagram',    value: instagram, userId: id  });
        if (!!facebook)  contacts.push({name: 'Facebook',     value: facebook, userId: id  });
        if (!!whatsapp)  contacts.push({name: 'Whatsapp',     value: whatsapp, userId: id  });
        if (!!telegram)  contacts.push({name: 'Telegram',     value: telegram, userId: id  });
        
        if(contacts.length > 0) {
          contacts.forEach( async (item) => {
            const newContactUser = await client.contact.upsert({
                     where: {
                      unique_contact_user: {name: item.name, userId: id},
                     },
                     update : {
                      value: item.value,
                     },
                     create: {
                       name: item.name,
                       value: item.value,
                       userId: id
                     }
            });
          })
        }
        
        // if (contacts.length > 0) {
        //   const newContactsUser = await client.contact.createMany({
        //       data: contacts, 
        //   });
        // }
        return userUpdate;
}

export async function createUserOrderAssociate(user: User)   {
    const newUserOrderAssociate = await client.userOrder.create({
        data: {
          userId: user.id,
          typeUserOrderId: 'associate',
          status: 'created',  //created, pendency, denied, under_debate, accept     
        },
      })
      if(!newUserOrderAssociate) {
        throw new Error("Erro ao realizar criação do pedido de associação na base de dados.");
      }
      let template = await generateMessageToSendMail('order-associate-apply.html');
      template = template.replace('{ID}', newUserOrderAssociate.id);
      //template = template.replace('{DADOS}', {name});
      const emailSended = await sendMail('mailer@institutosaira.org',user.email,
                'Instituto Saíra - redefinição de senha', template );
      return newUserOrderAssociate.id;
}
