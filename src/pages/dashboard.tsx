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
import { Tab } from '../components/Tab';



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
  
  const nav = [
    { name: 'Geral',  element: <Geral user={user} orderAssociateStatus={orderAssociateStatus}/>, current: true },
    { name: 'Agenda', element: <Schedule user={user}/>, current: false },
    { name: 'Círculos/papeis', element: <CirclesAndRoles user={user}/>, current: false },
    { name: 'Associe-se', element: <Associate user={user} orderAssociateStatus={orderAssociateStatus} setOrderAssociateStatus={setOrderAssociateStatus}/>, current: false },
    { name: 'Sugestões', element:<Suggestions user={user} />,current: false },
    { name: 'Anotações', element:<Notes user={user} /> ,current: false },
    { name: 'Perfil', element: <Profile  />, current: false },
  ]; 
  

  return (


    <>

      
    <Layout title='Seu painel' subtitle='template em construção' page='dashboard'>
      { user ? 
       <Tab nav={nav}/>
       : null}
    </Layout>
    
    
    </>


  )
}
