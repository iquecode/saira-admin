
import { normalizedUser } from '../../auth/lib/normalizedUser';
import { client } from '../../lib/prisma/client';

export async function updateUserWithDataFormLimitedFields(id:string, data:any)   {
      
        // console.log('###data: ');
        // console.log(data);
  
        const {bio, occupation, nickname, socialName, name, birthDate, cityId, stateId, countryId} = data;
        
        let dataToUpdate = {} as any; 
        
        if (bio) dataToUpdate.bio = bio;
        if (occupation) dataToUpdate.occupation = occupation;
        if (nickname) dataToUpdate.nickname = nickname;
        if (socialName) dataToUpdate.socialName = socialName;
        if (name) dataToUpdate.name = name;
        if (birthDate) dataToUpdate.birthDate = birthDate;
        if (countryId) dataToUpdate.country = { connect: {id: parseInt(countryId)}};;
        if (cityId) dataToUpdate.city = { connect: {id: parseInt(cityId)}};
        

        // console.log('###dataToUpdate: ');
        // console.log(dataToUpdate);
        
                   
        const userUpdate = await client.user.update({
            where: {
                id,
            },
            data: dataToUpdate,
        });
        if(!userUpdate) {
            throw new Error("Erro ao realizar update dos dados do usuário na base de dados.");
        }
       
        return userUpdate;
}

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


async function getUserIdFromOrderId(orderId: string) {
  const order = await client.userOrder.findUnique({
      where: {
          id: orderId,
      },
      select: {
          userId: true,
      }
  })  
  return order.userId;  
}

export async function getUser(id: string) {

    // let userId = id;
    // if (id.substring(0,7) == 'orderid') {
    //     userId = await getUserIdFromOrderId(id); 
    // }
    const userId = id.substring(0,7) != 'orderid' ? id : await getUserIdFromOrderId(id.replace('orderid', ''));  
    const user = await client.user.findUnique({
        where: {
          id: userId,
        },
        include: {
          circles: true,
          roles: true,
          orders: true,
          city: {
            include: {
              state: true,
            }
          }
        }
      });
    if (!user) {
        return false;
    }
    return normalizedUser(user);  
    //console.log('aqui ID do post: ' + id);
}
