import { UserNormalized } from "../../../model/User"

type CircleAndRolesProps = {
    user: UserNormalized
  }

export default function CirclesAndRoles({user}:CircleAndRolesProps) {

       
        return (
    
        <>
            <h1>Em construção</h1>
            <p>A idéia é mostrar os cirulos e papeis que o usuário é membro/energiza..., com os links para as áreas dos mesmos</p>
       
            <div className="mt-6">



              {user.circles.length <= 0 && user.roles.length <= 0 ? 
              
              null
              :


              (
                user.circles.map((circle)=>{
                  //@ts-ignore
                  <li key={circle.name}>{circle.name}</li>    
                }) &&

                user.roles.map((role)=>{
                  //@ts-ignore
                  <li key={role. name}>{role.name}</li>    
                })
              )
              
              
              
              
              
              }
             
              
              
              




              {/* {JSON.stringify(user.circles)};

              {JSON.stringify(user.roles)}; */}




            </div>
           
        </>  
        )
              
}