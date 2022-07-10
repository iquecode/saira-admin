import { createContext, useEffect, Dispatch, useState } from "react";

type Tema = 'dark' | ''

interface AppContextProps {
    tema?: String
    alternarTema?: () => void
    menuIndex?: number
    setMenuIndex?: Dispatch<number>
    loading?: boolean
    setLoading?: Dispatch<boolean>
}

const AppContext = createContext<AppContextProps>({})




const menu = { 'dashboard': 0, 
               'projects': 1, 
               'governance': 2, 
               'library': 3,
               'blog': 4,
               'faq': 5,}



export function AppProvider(props) {

    
    const [tema, setTema] = useState('dark');
    const [menuIndex, setMenuIndex] = useState(0);
    const [loading, setLoading] = useState<boolean>(false);

    function alternarTema() {
        const novoTema = tema === 'ligth' ? 'dark' : 'ligth'
        setTema(novoTema)
        localStorage.setItem('tema', novoTema)
    }

    useEffect(() => {

        const temaSalvo = localStorage.getItem('tema') ? localStorage.getItem('tema') : 'dark';
        setTema(temaSalvo);

        const page = localStorage.getItem('page')? localStorage.getItem('page') : 'dashboard';
        const currentMenuIndex = menu[page];
        setMenuIndex(currentMenuIndex);
    }, [])

    return (
        <AppContext.Provider value={{
            tema,
            alternarTema,
            menuIndex,
            setMenuIndex,
            loading,
            setLoading
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext