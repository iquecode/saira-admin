import route from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../../services/api";
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

    const [loading, setLoading] = useState(true)
    
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


    async function startSession(user) {
    if(user.email) {
        //const user = await normalizeUser(userAPI);
        setUser(user);
        setLoading(false);
        return user.email;
    } else {
        setUser(null);
        setLoading(false);
        return false;
    }
}




    async function signIn({ email, password}: AuthCredentials) {
        //console.log({ email, password })
        const response = await api.post('auth/login', {
            email,
            password,
        })

        const cod = response.data.cod;   
        switch (cod) {
            case 'success':
                setUser(response.data.user);
                setLoading(false);
                route.push('/dashboard');
                break;
            case 'unverified':
                //setUser(response.data.user);
                setLoading(false);

                route.push('/sign-up-flow/resend-link-validate-email/' + response.data.user.tokenSignUpFlow );
                break;
            default:
                setLoading(false);
                alert(response.data.error)
                break;
        }

        // if(response.data.user) {
        //     setUser(response.data.user);
        //     setLoading(false);
        //     console.log('data: ' + response);
        //     route.push('/dashboard');
        // } else {
        //     alert(response.data.error);
        // }
        //console.log(response.data);
    }


    async function signUp({ email, password, passwordConfirm }: AuthCredentials) {
        //console.log({ email, password })
        const response = await api.post('auth/sign-up', {
            email,
            password,
            passwordConfirm
        });
        if(response.data.user) {
            setUser(response.data.user);
            setLoading(false);
            console.log('data: ' + response);
            route.push('/sign-up-flow/sign-up-before-validate-email/' + response.data.user.tokenSignUpFlow);
        }
        else {
            console.log('aqui deu problema: ' +response.data)
            alert('aqui deu problema: '+ response.data);
        }

        //console.log(response.data);
    }


    async function logout() {
        //console.log({ email, password })
        localStorage.removeItem('page');
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