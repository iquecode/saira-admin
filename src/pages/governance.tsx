import { DataGrid } from "../components/DataGrid";
import { Pagination } from "../components/Pagination";
import Layout from "../components/template/Layout";

export default function Governance() {

    function test(id: string) {
        alert('Teste - id: ' + id);
    }

    const columns = [
        {field: 'id', headerName:'ID'},
        {field: 'brand', headerName:'Marca'},
        {field: 'color', headerName:'Cor'},
        {field: 'product', headerName:'Produto'},
        {field: 'price', headerName:'Preço'},
    ];
    const data = [
        {id: '1', brand: 'Apple', color: 'Prata', product: 'Laptop', price: 'R$2.999'},
        {id: '2', brand: 'Microsoft', color: 'Preto', product: 'PC', price: 'R$1.999'},
        {id: '3', brand: 'Logitec', color: 'Azul', product: 'Mouse', price: 'R$199'},
    ];

    return (
        <Layout 
            title='Governança' 
            subtitle='Informações sobre os projetos!'
            page='governance'
            
        >
   

            <div className='dark:text-zinc-300 mt-8'>
                <p>Detalhes da governança do instituto.</p>
                <p>Link para área dos documentos - estatuto - prestação de contas - regimentos - atas.</p>
                <p>Lista dos Círuclos e membros.</p>
                <p>Link para área/app dos Círculos.</p>
            </div>

            <div className="w-full">
                <DataGrid columns={columns} data={data} action={test}/>
                <div className="flex mt-9 justify-center w-ful">
                    <Pagination />
                </div>
            </div>
            
            
        </Layout>
    )
}