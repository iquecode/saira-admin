

import { User, UserOrder } from '@prisma/client';
import { ParsedUrlQueryInput } from 'querystring';
import { isPromise } from 'util/types';
import { normalizedUser } from '../../auth/lib/normalizedUser';
import { client } from '../../lib/prisma/client';
import { generateMessageToSendMail, sendMail } from '../../lib/util';

export async function updateUserWithDataForm(id:string, data:any)   {
        const {cityId, stateId, countryId,
             ...dataUserFromForm} = data;
        let dataToUpdate = {...dataUserFromForm, 
                              country: { connect: {id:parseInt(countryId)}},
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
       
        return userUpdate;
}
