import { IconeLua, IconeSol } from "../icons"

interface BotaoAlternarTemaProps {
    tema: String
    hideInSmall?: Boolean
    alternarTema: () => void
}

export default function BotaoAlternarTema(props: BotaoAlternarTemaProps) {
   
    const classHideinSmall = props.hideInSmall ? 'hidden sm:flex' : 'flex'
   
    return props.tema === 'dark' ? (
        <div onClick={props.alternarTema} className={`
            ${classHideinSmall}
            items-center cursor-pointer
            bg-gradient-to-r from-yellow-300 to-yellow-600
            w-14 h-8 p-1 rounded-full
        `}>
            <div className={`
                flex items-center justify-center
                bg-white text-yellow-600 
                w-6 h-6 rounded-full
            `}>
                {IconeSol(4)}
            </div>
            <div className={`
                flex items-center ml-4
                text-white
            `}>
                {/* <span  className="text-sm">Claro</span> */}
            </div>
        </div>
    ) : (
        
        <div onClick={props.alternarTema} className={`
            ${classHideinSmall}
            items-center justify-end cursor-pointer
            bg-gradient-to-r from-gray-500 to-gray-900
            w-14 h-8 p-1 rounded-full
        `}>

            <div className={`
                flex items-center
                text-gray-300
            `}>
                {/* <span className="text-sm">Escuro</span> */}
            </div>
            <div className={`
                flex items-center justify-center
                bg-black text-yellow-300
                w-6 h-6 rounded-full
            `}>
                {IconeLua(4)}
            </div>
           
        </div>

    )
}