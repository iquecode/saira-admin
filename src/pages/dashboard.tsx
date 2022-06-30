import { GetServerSideProps } from 'next';
import { useContext, useEffect } from 'react';
import Layout from '../components/template/Layout';
import useAuth from '../data/hook/useAuth';
import route from "next/router";

export default function Dashboard(props) {

  const  { user }  = useAuth();


  return (
    <Layout titulo='Seu painel' subtitulo='template em construção' page='dashboard'>
     
     
      {user ?
      
      
     
      <div className='dark:text-zinc-300'>

               
                  Olá{' '}{user.nickname? user.nickname 
                        :  user.name? user.name
                        :  <>
                              user.email
                              <p>..bom, chamei você pelo seu email, pois não sei seu nome hehe</p>
                              <p>Se quiser se apresentar, você pode atualizar seus danos em perfil.</p>
                           </>
                  }

                  <p>Eu sou a plataforma - versão beta - do Instituto Saíra e ainda estou não estou pronta</p>
                  <p>Toda a ajuda é bem vinda para me deixar bem legal e inteligente : )</p>
                  
                  { user.circles.filter(circle => circle.name == 'Assembléia Geral').length >= 1 
                    ? 
                      <>
                        Associado
                      </>
                    : 
                      <>
                        <p>vejo que você ainda não é uma pessoa associada ao Instituto</p> 
                        <p>A primeira funcionalidade da plataforma é justamente possibilitar as pessoas a solicitarem a associação</p>
                        <p>Se associando, você poderá participar das decisões estratégias e da auto-gestão do instituto : )</p>
                        <p>Independente disso, você pode compor os círculos, aplicar projetos e apoiar de diversas formas</p>
                        <p>Mas é claro que eu ficarei muito contente se você se associar. Para isso, clique no botão abaixo e siga as instruções (
                        será preciso apenas preencher um formulário com seus dados, submetendo o pedido de associação.
                        </p>
                      </>
                      }
                
              
                <p>Informação se é associado ao instituto ou não... caso não seja, link para form associação</p>
                <p>Possibilidade de doar - recorrente ou uma vez</p>
                <p>Informações sobre Tokens Saira do usuário   {props.dataServerSide}</p>
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