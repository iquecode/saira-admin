import { useEffect, useState } from "react"
import useAppData from '../../../../data/hook/useAppData'
import useAuth from "../../../../data/hook/useAuth";
import { UserNormalized } from "../../../../model/User";
import { api } from "../../../../services/api";
import { RoadMap } from "./RoadMap";


type InfosProps = {
    user: UserNormalized
  }

export function Suggestions({user}:InfosProps) {
    const {  getAuthenticatedUser } = useAuth();
    const { setLoading} = useAppData();

    const [description, setDescription] = useState('');
    const [type, setType] = useState('suggestion');

    const handleChange = (event) => {
        setType(event.target.value)
      }


  const handleSubmit = async (event) => {
    event.preventDefault();
    //alert(`Tipo: ${type}  -  descrição: ${description}`);
    try {
        setLoading(true);
        console.log(type);
        console.log(description);
        const response = await api.post('model/suggestion/create', {
            type: type,
            description: description,
        });
        if (response.data.suggestion) {
            setLoading(false);
            setDescription('');
            setType('');
            alert('Envio bem sucedido, protocolado com o ID :' + response.data.suggestion.id)
        } else {
            setLoading(false);
            console.log(response);
            alert("Ops. Ocorreu um erro no processamento. Tente reenviar");
        }
        setLoading(false);
    } catch(error) {
        setLoading(false);
        alert("Ops. Ocorreu um erro: " + error.message);
    }

  }
  

    return (
    <>


<div className="mt-6 p-6 w-full text-justify bg-white rounded-lg border border-gray-200 shadow-md dark:bg-zinc-800 dark:border-gray-700 font-normal text-gray-700 dark:text-gray-300">
<RoadMap />
</div>



     
    <div className="mt-6 p-6 w-full text-justify bg-white rounded-lg border border-gray-200 shadow-md dark:bg-zinc-800 dark:border-gray-700 font-normal text-gray-700 dark:text-gray-300">
        


        
       
        
    

        <div>
            




            <form className="flex flex-col" onSubmit={handleSubmit}>
            <p className="text-brandBlue-500 font-bold">Sugestões ou relato de erro</p>

            <div className="border-dotted border-2 p-3 dark:border-gray-700 border-gray-300 rounded-lg mt-6">
                {/* <p className="text-base text-zinc-400 font-semibold">Informe as infos que quiser :)</p> */}
                <label className={`label-input-form`}>Tipo
                    <select 
                        id="types" 
                        className="input-form"
                        value={type}
                        onChange={handleChange}
                    >
                       <option value='suggestion'>Sugestão de implementação ou melhoria</option>
                       <option value='bug'>Relato de Erro/Bug</option>
                    </select>
                </label>
                <label className="label-input-form">Descrição
                        <textarea 
                            id='description' 
                            className="text-area-form" 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                </label>  
               
                <div className="mt-6 w-full flex justify-center">
                    <button className="bg-brandBlue-500 
                                        p-3 hover:brightness-110 
                                        duration-200 
                                        rounded-sm 
                                        w-full 
                                        md:w-1/2 
                                        text-white 
                                        font-bold"
                                        type="submit"
                            // onClick={()=>setCurrentStep(3)}
                    >
                            ENVIAR
                    </button>
                </div>
                </div>
            </form>
        </div>
            
    </div>
    
    </>  
    )
}
