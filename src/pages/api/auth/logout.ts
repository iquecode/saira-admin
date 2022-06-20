/* eslint-disable import/no-anonymous-default-export */

import type { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from "cookie";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const { cookies } = req;

  const jwt = cookies.OursiteJWT;

  if (!jwt) {
    return res.json({ message: "Bro you are already not logged in..." });
  } else {
    const serialised = serialize("OursiteJWT", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: -1,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialised);

    res.status(200).json({ message: "Successfuly logged out!" });
  }
}


//apagar o registro específico deste token no banco de dados
//pegar pelo id do token no banco de dados que está gravado no payload
//quando usuário faz login, deve-se apagar - no banco de dados - o token relacionado ao dispositivo - pois o login gerará outro token
//e o gravará no banco.... para isso, a melhor forma é, no login... verificar se existe token jwt... se existir, apagar  antes.
//ou verifcar pelo user agent?... se bem que acho que não teria problema.... pois a verificação é pelo id do token.. o usuário pode
//ter múltiplos tokens.. então tranquilo.