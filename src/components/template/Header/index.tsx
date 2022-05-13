import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import Link from 'next/link';
import useAppData from '../../../data/hook/useAppData';

const user = {
    name: 'Fulano de Tal',
    email: 'fulano@tal.com',
    imageUrl:
      'https://avatars.githubusercontent.com/iquecode',
  }


  const nav = [
    { name: 'Painel', href: '/', current: true },
    { name: 'Projetos', href: '/projects', current: false },
    { name: 'Governança', href: '/governance', current: false },
    { name: 'Biblioteca', href: '/library', current: false },
    { name: 'Blog', href: '/blog', current: false },
    { name: 'FAQ', href: '/faq', current: false },
  ]; 



const userNavigation = [
    { name: 'Seu Perfil', href: '#' },
    { name: 'Preferências', href: '#' },
    { name: 'Sair', href: '#' },
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }




  interface HeaderProps {
    menuIndex: number
}



export function Header({menuIndex}) {

    const { setMenuIndex } = useAppData();

    useEffect(() => {
      if( menuIndex == 0 ) {
        setNavigation(nav);
      }
     setCurrent(menuIndex)
     setMenuIndex(menuIndex)
    }, [])

    const [navigation, setNavigation] = useState([]);

    













    function setCurrent(index: number) {
        const newNavigation = nav.map((item, i) =>{
            if (index === i) return { name: item.name, href: item.href, current: true };
            return { name: item.name, href: item.href, current: false };
        });
        console.log("olá!!!");
        setNavigation(newNavigation);

    }



    return (


        <Disclosure as="nav" className="bg-white dark:bg-zinc-800">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-16 w-32"
                        src="/images/logo.png"
                        alt="Workflow"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        
                        
                        
                        {
                        

                        navigation.map((item, index) => (
                         
                          <Link 
                            key={item.name}
                            href={item.href}>
                            <a onClick={()=>setMenuIndex(index)}
                            className={classNames(
                              item.current
                                ? 'bg-saira-blue text-white' 
                                : 'text-zinc-900 hover:bg-zinc-200 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white',
                              'px-3 py-2 rounded-md text-sm font-medium'
                            )}
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                            </a>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                    
                      <button
                        type="button"
                        className="bg-zinc-50 dark:bg-zinc-800 p-1 rounded-full text-gray-400 dark:hover:text-white hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative">
                        <div>
                          <Menu.Button className="max-w-xs dark:bg-zinc-900     rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span className="sr-only">Open user menu</span>
                            <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    
                    </div>
                    
                  </div>
                 
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="dark:bg-zinc-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white dark:hover:bg-gray-700 hover:bg-zinc-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current ? 'bg-saira-blue text-white' : 'dark:text-gray-400 text-zinc-600 dark:hover:bg-gray-700 dark:hover:text-white hover:bg-zinc-200',
                        'block px-3 py-2 rounded-md text-base font-medium'
                      )}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
              
                  <div className="flex items-center px-5">
                    <div className="flex-shrink-0">
                      <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium leading-none text-white">{user.name}</div>
                      <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                    </div>
                    <button
                      type="button"
                      className="ml-auto dark:bg-zinc-900 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="mt-3 px-2 space-y-1">
                    {userNavigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>













    )

    
}