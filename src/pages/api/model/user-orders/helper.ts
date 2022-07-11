

import { User, UserOrder } from '@prisma/client';
import { ParsedUrlQueryInput } from 'querystring';
import { isPromise } from 'util/types';
import { normalizedUser } from '../../auth/lib/normalizedUser';
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


export async function createUserOrderAssociate(user: User, ip: string, dispositive: string)   {
    const newUserOrderAssociate = await client.userOrder.create({
        data: {
          userId: user.id,
          typeUserOrderId: 'associate',
          status: 'created',  //created, pendency, denied, under_debate, accept     
          DataUserOrder: {
            create: [
              {name: 'ip', value: ip},
              {name: 'dispositive', value: dispositive},
            ]
          }
        },
      })
      if(!newUserOrderAssociate) {
        throw new Error("Erro ao realizar criação do pedido de associação na base de dados.");
      }
      let template = await generateMessageToSendMail('order-associate-apply.html');
      template = template.replace('{ID}', newUserOrderAssociate.id);
      const dataOrder = await getDataOrderAssociate(newUserOrderAssociate, ip, dispositive);
      template = template.replace('{DADOS}', dataOrder );
      const emailSended = await sendMail('mailer@institutosaira.org',user.email,
                'Instituto Saíra - seu pedido de associação foi recebido :)', template );
      return newUserOrderAssociate.id;
}



async function getDataOrderAssociate(order: UserOrder, ip: string, dispositive: string) {



  const user = await client.user.findUnique({
    where: {
      id: order.userId,
    },
    include: {
      circles: true,
      roles: true,
      orders: {
        include: {
          DataUserOrder: true,
        }
      },
      documentType: true,
      city: {
        include: {
          state: true,
        }
      }
    }
  });

  let data = '<pre>';
  data += 'Momento da solicitação....: ' + order.createdAt + '<br/>'; 
  data +=    'Usuário solicitante.......: ' + user.email + '<br/>';
  data +=    'IP da solicitação.........: ' + ip  + '<br/>';
  data +=    'Dispositivo da solicitação: ' + dispositive  + '<br/>';
  data +=    '-------------------------------------------- <br/><br/>'
  data +=    'Dados cadastrais enviados:<br/>'
  data +=    '-------------------------------------------- <br/>'
  data +=    'Nome..............: ' + user.name + '<br/>';
  data +=    'CPF...............: ' + user.cpf + '<br/>';
  data +=    'Doc. identificação: ' + user.documentType.name + ' ' + user.documentNumber +  '<br/>';
  data +=    'Ocupação..........: ' + user.occupation + '<br/>';
  data +=    'Endereço..........: ' + user.addressLine1 + ' ' + user.addressLine2 + ' ' + user.city.name + ' ' + user.city.state.uf + '<br/>';
  data +=    'Filiação..........: ' + user.motherName + ' | ' + user.fatherName + '<br/>';
  data +=    'Data nascimento...: ' + user.birthDate + '<br/>';
  
  return data;
}