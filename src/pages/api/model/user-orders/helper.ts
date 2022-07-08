

import { ParsedUrlQueryInput } from 'querystring';
import { client } from '../../lib/prisma/client';

export async function updateUserWithDataForm(id:string, data:any)   {
        const {linkedin, github, instagram, facebook, whatsapp, telegram, alternativeEmail,
               cityId, stateId, countryId, documentTypeId,   
             ...dataUserFromForm} = data;
        const dataToUpdate = {...dataUserFromForm, 
                              city:{ connect: {id: parseInt(cityId)}}, 
                              country: { connect: {id:parseInt(countryId)}},
                              documentType: { connect: {id:parseInt(documentTypeId)}}
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
        if (!!alternativeEmail) contacts.push({name: 'Email alternativo', value: alternativeEmail });
        if (!!linkedin)  contacts.push({userId: id, name: 'LinkedIn',     value: linkedin });
        if (!!github)    contacts.push({userId: id, name: 'GitHub',       value: github });
        if (!!instagram) contacts.push({userId: id, name: 'Instagram',    value: instagram });
        if (!!facebook)  contacts.push({userId: id, name: 'Facebook',     value: facebook });
        if (!!whatsapp)  contacts.push({userId: id, name: 'Whatsapp',     value: whatsapp });
        if (!!telegram)  contacts.push({userId: id, name: 'Telegram',     value: telegram });
        if (contacts.length > 0) {
          const newContactsUser = await client.contact.createMany({
              data: contacts, 
          });
        }
        return userUpdate.id;
}

export async function createUserOrderAssociate(userId:string)   {
    const newUserOrderAssociate = await client.userOrder.create({
        data: {
          userId,
          typeUserOrderId: 'associate',
          status: 'created',  //created, pendency, denied, under_debate, accept     
        },
      })
      if(!newUserOrderAssociate) {
        throw new Error("Erro ao realizar criação do pedido de associação na base de dados.");
      }
      return newUserOrderAssociate.id;
}
