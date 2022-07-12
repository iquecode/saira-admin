
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
