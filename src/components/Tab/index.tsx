import { useEffect, useState } from "react";

interface TabProps {
    nav: {name: string, element: JSX.Element, current: boolean}[],
    initialIndex?: number,
}

export function Tab({nav, initialIndex=0} : TabProps) {

  
  function buildNavigation() {
    const newProps = { setCurrent };  
    const newNavigation = nav.map((item, i) => {
        return  {name: item.name, element: <item.element.type {...item.element.props} {...newProps} />, current: false };
    });
    return newNavigation;
  }  

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [navigation, setNavigation] = useState(buildNavigation);
  const classNameCurrent = "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500";
  const classNameNotCurrent = "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 dark:hover:text-gray-300";
  
  function setCurrent(index: number) {
    const newNavigation = navigation.map((item, i) =>{
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
        <div className='dark:text-zinc-300 text-lg leading-relaxed'>
            {navigation[currentIndex].element}      
        </div>  
    </>
  )
}
