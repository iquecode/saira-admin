import route from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../../services/api";
import { User } from "../../model/User"
import { AxiosResponse } from "axios";


type AuthCredentials = {
    email: string;
    password: string;
    passwordConfirm?: string;
}

interface IAuthContext {
    signIn(credentials: AuthCredentials): Promise<void>;
    signUp(credentials: AuthCredentials): Promise<void>;
    logout(): Promise<void>,
    isAuthenticated: boolean;
    getAuthenticatedUser():Promise<AxiosResponse>;
    user: any;
}

type AuthProvideProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as IAuthContext)

export function AuthProvider({ children }: AuthProvideProps) {
    
    const [user, setUser] = useState<{} | null>(null)
    const isAuthenticated = !!user;

    useEffect( () => {

        api.get('auth/get-user').then(res=>{
            setUser(res.data.user);

            

        })
        //const { 'nextauth.token': token } = parseCookies()
    
        // if (token) {
        //   recoverUserInformation().then(response => {
        //     setUser(response.user)
        //   })
        // }
      }, [])






    async function signIn({ email, password}: AuthCredentials) {
        //console.log({ email, password })
        const response = await api.post('auth/login', {
            email,
            password,
        })

        if(response.data.user) {
            setUser(response.data.user);
            route.push('/dashboard');
        }
        console.log(response.data);
    }


    async function signUp({ email, password, passwordConfirm }: AuthCredentials) {
        //console.log({ email, password })
        const response = await api.post('auth/sign-up', {
            email,
            password,
            passwordConfirm
        })

        console.log(response.data);
    }


    async function logout() {
        //console.log({ email, password })
        const response = await api.get('auth/logout');
        route.push('/');

        console.log(response.data);
    }




    async function getAuthenticatedUser() {
        //console.log({ email, password })
        const response = await api.get('auth/get-user');
        //console.log(response.data);
        return response;
    }

    return (
        <AuthContext.Provider value={{ signIn, signUp, logout, isAuthenticated, getAuthenticatedUser, user}}>
            {children}
        </AuthContext.Provider>
    )
}