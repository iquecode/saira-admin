import Image from 'next/image'
import loading from '../../public/images/loading.gif'


export default function Loading({msg}) {
  
  return (
    <div className="flex justify-center items-center w-screen h-screen">
        <div className="flex flex-col justify-center items-center">
             <Image src={loading} alt="loading..." />
             <p>{msg ? msg : 'Carregando...'}</p>
        </div>
    </div>   
 
  )
}


