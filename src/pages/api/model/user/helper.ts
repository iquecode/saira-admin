
import { normalizedUser } from '../../auth/lib/normalizedUser';
import { client } from '../../lib/prisma/client';

export async function updateUserWithDataForm(id:string, data:any)   {
      
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
