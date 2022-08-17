import route from "next/router";
import { ArrowLeft } from "phosphor-react";

interface ButtonBackProps {
    path: string,
    text: string,
}

export function ButtonBack({path, text} : ButtonBackProps) {

    return (
        <button 
            type="button" 
            className="font-semibold mt-4 pl-1 pr-3 py-2 inline-flex text-white bg-brandBlue-500 hover:opacity-90 rounded-lg text-sm text-center items-center dark:bg-brandOrange-500"
            onClick={()=>route.push(path)}
            
        >
            <ArrowLeft  size={32} className="mr-2"/>
            {text}
        </button>
    )
}