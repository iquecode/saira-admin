import { createContext, useEffect, Dispatch, useState } from "react";

//type Tema = 'dark' | ''

interface AppContextProps {
    tema?: String
    alternarTema?: () => void
    menuIndex?: number
    setMenuIndex?: Dispatch<number>
}

const AppContext = createContext<AppContextProps>({})

export function AppProvider(props) {
    const [tema, setTema] = useState('dark');
    const [menuIndex, setMenuIndex] = useState(0);

    function alternarTema() {
        const novoTema = tema === '' ? 'dark' : ''
        setTema(novoTema)
        localStorage.setItem('tema', novoTema)
    }

    useEffect(() => {
        const temaSalvo = localStorage.getItem('tema')
        setTema(temaSalvo)
    }, [])

    return (
        <AppContext.Provider value={{
            tema,
            alternarTema,
            menuIndex,
            setMenuIndex
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext