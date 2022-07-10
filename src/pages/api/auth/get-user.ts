/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from 'next'
import a from 'jsonwebtoken';
import { client } from '../lib/prisma/client'
import { compare } from 'bcryptjs';
import { generateTokenAndSaveInDB } from './lib/functions';
import { normalizedUser } from '../auth/lib/normalizedUser'

export default async function (req: NextApiRequest, res: NextApiResponse) {
    const { cookies } = req;
  
    const jwt = cookies.OursiteJWT;


  
    if (!jwt) {
      return res.json({ message: "Invalid token!" });
      
    }
  
    const data = a.verify(jwt, process.env.SECRET);
    //return res.json({ data: "Top secret data!" });
    const tokenData = JSON.parse(JSON.stringify(data));  
    //const tokenId = tokenData.id;
    //const teste = data['userId'];
    

    const tokenDB = await client.tokenHash.findUnique({
       where: {
         id: tokenData.id,
       },
    });
    if (!tokenDB) {
      return res.json({ message: "Invalid token!" });
    }

    //compara o jwt com o tokenDB.hash
    const tokenMatch = await compare(jwt, tokenDB?.hash);

    const match = tokenMatch ? 'COMPARAÇÃO BEM SUCEDIDA' : 'COMPARAÇÃO SEM SUCESSO';
    

    if (tokenMatch) {

      const user = await client.user.findUnique({
        where: {
          id: tokenDB.userId,
        },
        include: {
          circles: true,
          roles: true,
          orders: true,
        }
      });


      //apagar token atual do banco de dados 
      const deleteToken = await client.tokenHash.delete({
        where: {
          id: tokenDB.id,
        },
      });
      
      // gerar novo token-deve substituir o antigo nos cookies- e o gravar no banco de dados
      // limpar apagar token nos cookies 
     
      // const jsonParceStringfy = JSON.parse(JSON.stringify(data));
     
      //a504fe7b-6442-4ebf-8b9b-869a6bad4904   id  iquecode@gmail.com
      let newToken = null;
      if (deleteToken) {
        newToken = await generateTokenAndSaveInDB(tokenData.userId, req.headers['user-agent']);
        res.setHeader("Set-Cookie", newToken);
      }
      

      return res.json({ jwt, data, match, newToken, user: normalizedUser(user), 
       }); // autenticado - mudar retorno
    } else {
      
      return res.json({ jwt, data, match });  // não autenticar - mudar retorno
    }

  }