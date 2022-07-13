export function RoadMap() {
    return (
        <div className="text-justify">

<p className="mt-2">Essa é a versão beta da plataforma, ainda em desenvolvimento.</p>

<p className="mt-2">Por enquanto está plenamente funcional o cadastramento de novos usuários e o fluxo de novas associações ao Instituto.</p>

<p className="mt-2">Toda a ajuda é bem vinda para construirmos um sistema bem legal para dar suporte ao Instituto, aos projetos, às pessoas associadas e aos usuários.</p>


<p className="mt-2">No final desta página você pode enviar sugestões de implementações, de melhorias ou relatos de erros.</p>

<p className="mt-2 text-brandBlue-500 font-semibold">Abaixo, a lista de implementações que estão no "radar" para serem lançadas em breve:</p>

<p className="mt-2 text-brandBlue-500">1. Integração com meio de pagamento e split de pagamento</p>
<p className="mt-2">Integração com o pagar.me (Instituto já possue conta), possibilitando doações  por pix e cartão de crédito, de forma única ou recorreente (mensal).</p>
<p className="mt-2">Possibilitar doação para o Instituto como um todo ou para custeio de projetos específicos (com split de pagamento).</p>
<p className="mt-2">Implementar o "Token Saíra"-"moeda alternativa" conjuntamente, pessoas que doam recebem...</p>

<p className="mt-2 text-brandBlue-500">2. Implementação das funcionalidades das áreas dos menus Projetos, Governança, Biblioteca, Blog e Faq</p>
<p className="mt-2">Projetos: área que reunirá informações sobre os projetos, com possibilidade dos usuários submeterem projetos para análise do Instituto, comforme estatuto.</p>
<p className="mt-2">Governança: detalhes da estrutura de Governança do isntituto, documentos de Governança, lista dos círculos e membros, área dos círculos.</p>
<p className="mt-2">Biblioteca: conteúdo da biblioteca que já temos no Drive.</p>
<p className="mt-2">Blog: área para cadastro de postagens para o blog público, com integração com o site.</p>
<p className="mt-2">FAQ: perguntas e respostas.</p>

<p className="mt-2 text-brandBlue-500">3.Segurança</p>
<p className="mt-2">Foi criado um sistema próprio de autenticação para a plataforma com acesso por senha criptografada.</p>
<p className="mt-2">Quando o usuário informa senha e email, o sistema gera um Token de autenticação no formato JWT armazenado em cokies com a diretiva httpOnly, possibilitando a leitura apenas pelo servidor (impedindo a possibilidade de sequestro do token em ataques do lado do cliente).</p>
<p className="mt-2">Uma infomação refetente a este token também é criptografada e armazenada no banco de dados, com a identificação do dispositivo conectado.</p>
<p className="mt-2">A partir daí, o usuário não precisará mais digitar email e senha para se logar no respectivo dispositivo, pois o sistema o autenticará, validando o token presente no dispositivo com a informação criptografada no banco de dados.</p>
<p className="mt-2">A cada acesso, o token é recriado e atualizado com outros valores.</p>
<p className="mt-2">Se o usuário não acessar por 30 dias pelo dispositivo, precisará informar email e senha novamente.</p>

<p className="mt-2 font-semibold">As implementações que estão no "radar": </p>
<p className="mt-2">Listagem dos dispositivos conectados para que o usuário posso desconetar pelo seu painel.</p>
<p className="mt-2">Implementação de dois fatores de autenticação no primeiro acesso a novo dispositivo, exigindo, além de email e senha, 
o acesso a um email de confirmação enviado pelo sistema. </p>

<p className="mt-2 text-brandBlue-500">4.Conveniência na autenticação</p>
<p className="mt-2">Talvez seja interessante integrar com o sistema de autenticação com o Google, para que o usuário possa se logar com o Google, sempre que desejar.</p>
<p className="mt-2">(isso é fácil de fazer, mas decidimos realizar um sistema próprio antes, por questão de autonomia)</p>
</div>
    )
}