
import { client } from '../../lib/prisma/client';

export async function createSuggestion(userId:string, type: string, description: string) 
{

        console.log('####aqui data');
        console.log('userId: ' + userId);
        console.log('type :' + type);
        console.log('description: ' + description);

        const suggestion = await client.suggestion.create({
            data: {
                userId: userId,
                description,
                type,
            }
        });
        if(!suggestion) {
            throw new Error("Erro ao realizar update dos dados do usuário na base de dados.");
        }
        return suggestion;
}
