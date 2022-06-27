import { GetServerSideProps } from 'next';
import { useContext, useEffect } from 'react';
import Layout from '../components/template/Layout';
import useAuth from '../data/hook/useAuth';
import route from "next/router";

export default function Dashboard(props) {

  const  { user }  = useAuth();




  return (
    <Layout titulo='Seu painel' subtitulo='template em construção' page='dashboard'>
      <div className='dark:text-zinc-300'>
                <p>Dashborad, infos resumidas e links. {user?.email}</p>
                <p>Informação se é associado ao instituto ou não... caso não seja, link para form associação</p>
                <p>Possibilidade de doar - recorrente ou uma vez</p>
                <p>Informações sobre Tokens Saira do usuário   {props.dataServerSide}</p>
            </div>   
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