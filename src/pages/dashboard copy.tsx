import { GetServerSideProps } from 'next';
import { useContext, useEffect, useState } from 'react';
import Layout from '../components/template/Layout';
import useAuth from '../data/hook/useAuth';
import route from "next/router";
import  Geral  from '../components/pages/dashboard/Geral';
import Schedule from '../components/pages/dashboard/Schedule';
import CirclesAndRoles from '../components/pages/dashboard/CirclesAndRoles';
import Associate from '../components/pages/dashboard/Associate/Associete';

import Notes from '../components/pages/dashboard/Notes';
import { UserOrder } from '@prisma/client';
import Profile from '../components/pages/dashboard/Profile/Profile';
import { Suggestions } from '../components/pages/dashboard/Suggestions';



export default function Dashboard(props) {

  const  { user }  = useAuth();

  const [orderAssociateStatus, setOrderAssociateStatus] = useState<string | null>(null);

  useEffect( () => {
    console.log('user orders:');
    console.log(user?.orders);
    console.log(user?.orders.length);
    const orderAssociateArray = user?.orders.filter((obj: UserOrder) => obj.typeUserOrderId == 'associate');
    //Se associe ao instituto
    //pendÊncia
    if (orderAssociateArray?.[0]) {
      const orderAssociate = orderAssociateArray[0] as UserOrder;
      setOrderAssociateStatus(orderAssociate.status);
      console.log('aquiuiudi');
      console.log(orderAssociateStatus);
    }
  }, []);
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const nav = [
    { name: 'Geral',  element: <Geral user={user} orderAssociateStatus={orderAssociateStatus} setCurrent={setCurrent}/>, current: true },
    { name: 'Agenda', element: <Schedule user={user}/>, current: false },
    { name: 'Círculos/papeis', element: <CirclesAndRoles user={user}/>, current: false },
    { name: 'Associe-se', element: <Associate user={user} orderAssociateStatus={orderAssociateStatus} setOrderAssociateStatus={setOrderAssociateStatus}/>, current: false },
    { name: 'Sugestões', element:<Suggestions user={user} />,current: false },
    { name: 'Anotações', element:<Notes user={user} /> ,current: false },
    { name: 'Perfil', element: <Profile  />, current: false },
  ]; 
  const [navigation, setNavigation] = useState(nav);
  const classNameCurrent = "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500";
  const classNameNotCurrent = "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300";
  
  //const elements =  [<Geral user={user} orderAssociateStatus={orderAssociateStatus} setCurrentIndex={setCurrentIndex}/>,<Schedule user={user}/>];

  
  
  console.log(navigation);

  function setCurrent(index: number) {
    const newNavigation = nav.map((item, i) =>{
      if (index === i) {
        setCurrentIndex(index);
        return { name: item.name, element: item.element, current: true }; 
      }
      return  {name: item.name, element: item.element, current: false };
      });
      setNavigation(newNavigation);
  }

  return (


    <>

      
    <Layout title='Seu painel' subtitle='template em construção' page='dashboard'>



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
        
        {navigation[currentIndex].element}      
    </div>  
    : null } 
  </Layout>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    </>


  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
  

  //validações 
  const dataServerSide = 'Dados do banco de dados ou outra fonte'


  return {
    props: {dataServerSide}
   
  }

  
} 