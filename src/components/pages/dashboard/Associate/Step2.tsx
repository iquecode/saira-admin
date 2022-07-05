import { Dispatch, SetStateAction, useState } from "react";
import { UserNormalized } from "../../../../model/User";

type AssocieteProps = {
  user: UserNormalized
  setCurrentStep:Dispatch<SetStateAction<number>>
}

export default function Step2({user, setCurrentStep}:AssocieteProps) {
  const [imageFront, setImageFront] = useState(null);
  const [imageBack, setImageBack] = useState(null);
  const [createObjectURLfront, setCreateObjectURLfront] = useState(null);
  const [createObjectURLback, setCreateObjectURLback] = useState(null);
  
  const uploadToClientFront = (event:any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      console.log('Filename: ' + i.name);
      console.log('Type: ' + i.type);
      console.log('Size: ' + i.size);
      setImageFront(i);
      setCreateObjectURLfront(URL.createObjectURL(i));
    }
  };

  const uploadToClientBack = (event:any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImageBack(i);
      setCreateObjectURLback(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async () => {        
    const body = new FormData();
    // console.log("file", image)
    body.append("file", imageFront); 
    body.append("file2", imageBack);     
    const response = await fetch("/api/upload/upload", {
      method: "POST",
      body
    });
    const responseData =  await response.json();
    if (responseData.success) {
      setCurrentStep(3);
    } else {
      alert('Ocorreu erro no processamento. Tente reenviar as imagens');
    }
  };

  return (
    <>
    <div className="p-6 w-full text-justify bg-white rounded-lg border border-gray-200 shadow-md dark:bg-zinc-800 dark:border-gray-700 font-normal text-gray-700 dark:text-gray-300">
      
    <p className="text-brandBlue-500 font-bold p-4 mb-10">2. Selecione (ou tire) a foto da frente e a foto do verso de seu documento (identidade, CNH ou Passaporte), clicando nas áreas correspondentes:</p>
    {/* <div className="mt-6"> */}
         
        <div className="flex flex-col gap-6 sm:flex-row items-center justify-around">
        
        <label className="flex 
                          justify-center
                          items-center 
                          bg-white 
                          rounded-lg 
                          border-dashed
                          border 
                          
                          border-gray-400 
                          
                          dark:bg-zinc-800 
                          dark:border-gray-700
                          cursor-pointer
                          "

          >
               {!createObjectURLfront? 
               
                  <div className={`w-80 h-48 flex justify-center items-center`}>Frente</div>
                :  
                  <img className="rounded-lg w-72" src={createObjectURLfront} height='auto' alt="" />
               }  
              <input type="file" 
                    name="documentPhoto1" 
                    id='documentPhoto1' 
                    onChange={uploadToClientFront} 
                    accept="image/jpeg, image/png, image/gif, image/webp"
                    className="hidden w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              />
        </label>

        <label className="flex 
                          justify-center
                          items-center 
                          bg-white 
                          rounded-lg 
                          border-dashed
                          border 
                          border-gray-400 
                          dark:bg-zinc-800 
                          dark:border-gray-700
                          cursor-pointer
                          "

          >
               {!createObjectURLback? 
               
                  <div className={`w-80 h-48 flex justify-center items-center`}>Verso</div>
                :  
                  <img className="rounded-lg w-72" src={createObjectURLback} height='auto' alt="" />
               }  
              <input type="file" 
                    name="documentPhoto1" 
                    id='documentPhoto1' 
                    onChange={uploadToClientBack} 
                    className="hidden w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              />
        </label>


        </div>

        <div className="flex w-full justify-center mt-20 mb-4">
            <button
            className={`bg-brandBlue-500 
            p-3 
            ${(createObjectURLfront && createObjectURLback) ? 'hover:brightness-110' : null }
            duration-200 
            rounded-sm 
            w-full 
            md:w-1/2 
            text-white 
            font-bold
            ${!(createObjectURLfront && createObjectURLback) ? 'cursor-not-allowed' : null }
            ${!(createObjectURLfront && createObjectURLback) ? 'opacity-30' : null }
            `}
            type="submit"
            onClick={uploadToServer}
          >
            ENVIAR IMAGENS E CONTINUAR
          </button>  
        </div>
        
    </div> 
        
    </>  

  );
}
