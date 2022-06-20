
import { client } from '../api/lib/prisma/client';
import { hash } from 'bcryptjs';


export default async function handler(req, res) {
    const { email, password } = req.body;
    //const createUserUseCase = new CreateUserUseCase()


    try {

        const userAlreadExists = await client.user.findFirst({
            where: {
                email
            }
        });
        if (userAlreadExists) {
            throw new Error('User already exists!');
        }
        const passwordHash = await hash(password, 8);
        const user = await client.user.create({ data: { email, password:passwordHash} });
        res.json(user);
        
    } catch (error) {
        res.json({status:'error',
                              msg:error.message});
    }

   



}