import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid';

interface DataGridProps {
    columns: {field:string, headerName:string }[],
    data?: {id:string, }[],
    action?: (id: string) => void;
}

export function DataGrid({columns, data, action} : DataGridProps) {

return (

    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    {columns.map((column, i)=>
                        <th key={uuidv4()} scope="col" className={`py-3 px-6 ${column.field=='id' ? 'hidden' : null}`}>
                            {column.headerName}
                        </th>
                    )}
                </tr>
            </thead>
            <tbody>


                {data.map(function(object, i){
                    return(
                       
                        <tr key={uuidv4()} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        {columns.map((item, i) => 
                            <td key={uuidv4()} onClick={()=>action(object.id)} scope="row" className={`py-4 px-6 ${item.field == 'id' ? 'hidden' : null}`}>
                                {object[item.field]}
                            </td>    
                          )}
                        </tr>    
                        
                    )
                })}

             

            </tbody>
        </table>
    </div>

)
}