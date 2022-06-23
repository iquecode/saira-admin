/* This example requires Tailwind CSS v2.0+ */

import route from "next/router";
import { useEffect } from 'react'
import useAppData from '../../data/hook/useAppData'
import useAuth from '../../data/hook/useAuth'
import BotaoAlternarTema from './BotaoAlternarTema'


import { Header } from './Header'


interface LayoutProps {
  titulo: string
  subtitulo: string
  setCurrent?: (name: string)=>void
  children?: any 
  page: string
}


export default function Layout(props: LayoutProps) {
  const { tema, alternarTema, menuIndex} = useAppData()
  const { isAuthenticated } = useAuth()

  useEffect( () => {

    if (!isAuthenticated) {
      route.push('/');
    } else {
      localStorage.setItem('page', props.page);
    }
    }, [])

  return !isAuthenticated ? null :  (

    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-100">
        <body class="h-full">
        ```
      */}


   
      
   


      <div className={`${tema} min-h-screen`}>

        <div className='dark:bg-zinc-900 bg-zinc-100 min-h-screen'>

        <Header menuIndex = {menuIndex} />

        

        <header className="dark:bg-zinc-900 bg-zinc-100 dark:text-saira-blue shadow">
          <div className="max-w-7xl mx-auto py-6 pl-6 pr-2  sm:px-6 lg:px-8 flex">
            <h1 className="text-3xl font-bold flex-1">{props.titulo}</h1>
            <BotaoAlternarTema tema={tema} alternarTema={alternarTema}/>
          
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            {/* Replace with your content */}
            <div className="px-4 py-6 sm:px-0">
              {/* <div className="border-4 border-dashed border-gray-200 rounded-lg h-96" />
               */}
               {props.children} 
            </div>
            {/* /End replace */}
          </div>
        </main>
      </div>
      </div>

    
    </>
  )
}
