import { Dispatch, SetStateAction, useState } from "react";
import { UserNormalized } from "../../../../model/User";
import { api } from "../../../../services/api";
import useAppData from '../../../../data/hook/useAppData'


type AssocieteProps = {
  user: UserNormalized
  setCurrentStep:Dispatch<SetStateAction<number>>
}


function createImageCanvas(fileInput:any, maxSize=480, elementId="canvas"): string | null{
  
  let base64 = null;
  let url = null;

  var canvas=document.getElementById(elementId) as HTMLCanvasElement | null;
  var ctx=canvas.getContext("2d");
  var cw=canvas.width;
  var ch=canvas.height;
  const maxW = maxSize;
  const maxH = maxSize;
  let image = new Image();
  
  image.onload = function() {
    let iw = image.width;
    let ih = image.height;
    let scale = Math.min((maxW/iw), (maxH/ih));
    let iwScaled = iw*scale;
    let ihScaled = ih*scale;
    canvas.width=iwScaled;
    canvas.height=ihScaled;
    ctx.drawImage(image,0,0,iwScaled,ihScaled);  
    //base64 = canvas.toDataURL("image/jpeg", 0.5);
    //console.log(base64);
  }
  base64 = canvas.toDataURL("image/webp", 0.9);
  image.src = URL.createObjectURL(fileInput);
  return base64;
}



export default function Step2({user, setCurrentStep}:AssocieteProps) {
  const [imageFront, setImageFront] = useState(null);
  const [imageBack, setImageBack] = useState(null);
  const [createObjectURLfront, setCreateObjectURLfront] = useState(null);
  const [createObjectURLback, setCreateObjectURLback] = useState(null);
  const { setLoading} = useAppData();
  const [base64, setBase64] = useState<string | null>(null);
  
  const uploadToClientFront = (event:any) => {
    if (event.target.files && event.target.files[0]) {
      const fileInput = event.target.files[0];
      createImageCanvas(fileInput);
      console.log('Filename: ' + fileInput.name);
      console.log('Type: ' + fileInput.type);
      console.log('Size: ' + fileInput.size);
      setImageFront(fileInput);
      setCreateObjectURLfront(URL.createObjectURL(fileInput));
    }
  };

  const uploadToClientBack = (event:any) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      createImageCanvas(i,480,"canvas2");
      
      //setBase64(createImageCanvas(fileInput));
      setImageBack(i);
      setCreateObjectURLback(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async () => {        
    setLoading(true);
    console.log('canvas-base64: ' + createImageCanvas(imageFront));
    const response = await api.post('upload/upload', {
      documentPhotoURL1: createImageCanvas(imageFront),
      documentPhotoURL2: createImageCanvas(imageBack, 480, "canvas2"),
    })


    console.log('respose.data:');
    console.log(response.data);
    if (response.data.success) {
      setLoading(false);
      setCurrentStep(3);
    } else {
      setLoading(false);
      alert('Ocorreu erro no processamento. Tente reenviar as imagens');
    }
  };

  return (
    <>

    {/* {loading ? <Loading msg='Enviando imagens para o servidor...' />
            
            : */}
    
    
            <div className="p-6 w-full text-justify bg-white rounded-lg border border-gray-200 shadow-md dark:bg-zinc-800 dark:border-gray-700 font-normal text-gray-700 dark:text-gray-300">
      
            <p className="text-brandBlue-500 font-bold p-4 mb-10">2. Selecione (ou tire) a foto da frente e a foto do verso de seu documento (identidade, CNH ou Passaporte), clicando nas áreas correspondentes:</p>
           
                 
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
                            accept="image/jpeg, image/png, image/gif, image/webp"
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
                    onClick={createObjectURLfront && createObjectURLback ? uploadToServer : null}
                  >
                    ENVIAR IMAGENS E CONTINUAR
                  </button>  
                </div>


                <canvas id="canvas" width={480} height={480} className="hidden"></canvas>
                <canvas id="canvas2" width={480} height={480} className="hidden"></canvas>
                
            </div> 
    
    
    
    
    
    {/* } */}



   
        
    </>  

  );
}
