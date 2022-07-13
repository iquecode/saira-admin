import { useState } from "react";
import { UserNormalized } from "../../../../model/User";
import Avatar from "./Avatar";
import Infos from "./Infos";
import Security from "./Security";
import useAuth from "../../../../data/hook/useAuth";



export default function Profile() {

    const { user } = useAuth();

    const nav = [
        { name: 'Avatar',  element: <Avatar />, current: true },
        { name: 'Infos pessoais', element: <Infos />, current: false },
        { name: 'Segurança', element: <Security />, current: false },
    ]; 
    const [navigation, setNavigation] = useState(nav);
    const classNameCurrent = "inline-block py-3 px-4 text-white bg-brandBlue-500 rounded-lg active";
    const classNameNotCurrent = "inline-block py-3 px-4 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white";


    const [currentIndex, setCurrentIndex] = useState(0);

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
    
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
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
   
    </>  
    )
          
}