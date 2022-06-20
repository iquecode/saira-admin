import { api } from "../services/api";

interface ILoginRequest = {
  email: string;
  password: string;
}



export async function LoginRequest({ email, password }: ILoginRequest) {
  
    api.
  
    await delay()

  return {
    token: uuid(),
    user: {
      name: 'Diego Fernandes',
      email: 'diego@rocketseat.com.br',
      avatar_url: 'https://github.com/diego3g.png'
    }
  }
}

export async function recoverUserInformation() {
  await delay()

  return {
    user: {
      name: 'Diego Fernandes',
      email: 'diego@rocketseat.com.br',
      avatar_url: 'https://github.com/diego3g.png'
    }
  }
}


async function getAuthenticatedUser() {
  //console.log({ email, password })
  const response = await api.get('auth/get-token');
  console.log(response.data);
}