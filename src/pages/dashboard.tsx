import { GetServerSideProps } from 'next';
import { useContext, useEffect, useState } from 'react';
import Layout from '../components/template/Layout';
import useAuth from '../data/hook/useAuth';
import route from "next/router";
import  Geral  from '../components/pages/dashboard/Geral';
import Schedule from '../components/pages/dashboard/Schedule';

export default function Dashboard(props) {

  const  { user }  = useAuth();

  const nav = [
    { name: 'Geral', ref: 'geral', current: true },
    { name: 'Agenda', ref: 'schedule', current: false },
    { name: 'Círculos/papeis', ref: 'circlesAndRoles', current: false },
    { name: 'Associe-se', ref: 'membershipRequest', current: false },
    { name: 'Sugestões', ref: 'developmentPlataform', current: false },
    { name: 'Anotações', ref: 'notes', current: false },
    { name: 'Preferências', ref: 'preferences', current: false },
    { name: 'Perfil', ref: 'profile', current: false },
  ]; 
  const classNameCurrent = "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500";
  const classNameNotCurrent = "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300";
  
  const elements =  [<Geral user={user}/>,<Schedule user={user}/>];

  const [navigation, setNavigation] = useState(nav);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  console.log(navigation);

  function setCurrent(index: number) {
    const newNavigation = nav.map((item, i) =>{
      if (index === i) {
        setCurrentIndex(index);
        return { name: item.name, ref: item.ref, current: true }; 
      }
      return  {name: item.name,ref: item.ref, current: false };
      });
      setNavigation(newNavigation);
  }

  return (
    <Layout titulo='Seu painel' subtitulo='template em construção' page='dashboard'>



<ul className="mb-8 flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400">
  { 
    navigation.map((item, index) => (
      <li key={item.name} className="mr-2">
        <a href="#" onClick={()=>setCurrent(index)} className={`${item.current ? classNameCurrent : classNameNotCurrent}`}>
              {item.name}
         </a>
      </li>
    )) 
  }
</ul>
     
     
      {user ?
      <div className='dark:text-zinc-300 text-lg leading-relaxed'>
          
          {elements[currentIndex]}      
      </div>  
      : null } 
    </Layout>

  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  

  //validações 
  const dataServerSide = 'Dados do banco de dados ou outra fonte'


  return {
    props: {dataServerSide}
   
  }

  
} 