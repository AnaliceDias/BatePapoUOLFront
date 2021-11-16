//const elemento_rolagem_automatica = document.querySelector('.rolar');

let usuario = prompt("Digite seu nome de usuário");

let requisicao_usuario = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', {name: usuario});

const chat = document.querySelector("main");

const aux_horario = new Date();

let horario = {horas: "00", minutos: "00", segundos: "00"};

let mensagens_chat = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');

let todas_mensagens = []; 

let nova_mensagem = " ";

function historicoMensagens (historico_retorno){
    
    todas_mensagens=historico_retorno.data;
    let tamanho = todas_mensagens.length;
    chat.innerHTML=" ";

    for(let i =0; i< tamanho ; i++){

        if (todas_mensagens[i].type==="status"){
            chat.innerHTML += `
            <div class='notificacao rolar'>
            <div class='horario'>${'('+todas_mensagens[i].time+')'}</div>
            <div class='usuario'>${todas_mensagens[i].from}</div>
            <div class='conteudo_notificacao'>${todas_mensagens[i].text}</div>
            </div>
            `
    
        } else if (todas_mensagens[i].type==="message"){
            chat.innerHTML += `
            <div class='mensagem rolar'>
            <div class='horario'>${'('+todas_mensagens[i].time+')'}</div>
            <div class='usuario'>${todas_mensagens[i].from}</div>
            <div class='conteudo_conteúdo'>${todas_mensagens[i].text}</div>
            </div>
            `
        }else if (todas_mensagens[i].type==="private_message"){
           if (todas_mensagens[i].to===usuario){ // só exibe mensagens privadas escritas pelo próprio usuário ou destinadas ao próprio usuário
                chat.innerHTML += `
            <div class='mensagem_privada rolar'>
            <div class='horario'>${'('+todas_mensagens[i].time+')'}</div>
            <div class='usuario'>${todas_mensagens[i].from}</div>
            <div>" reservadamente para "</div>
            <div class='destinatario'>${todas_mensagens[i].to+':'}</div>
            <div class='conteudo_mensagem_privada'>${todas_mensagens[i].text}} </div>
            </div>
            `
            }
         }
    }
 
    elemento_rolagem_automatica.scrollIntoView();
}

function coletaHoras(){

horario["horas"]= aux_horario.getHours();
horario["minutos"]= aux_horario.getMinutes();
horario["segundos"]= aux_horario.getSeconds();

}

function tenteNovamente (erro){

    usuario = prompt("Opa! Esse nome de usuário já está sendo utilizado. Tente outro.");
    requisicao_usuario = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', {name: usuario});
    requisicao_usuario.then(entrouNaSala); 
    requisicao_usuario.catch(tenteNovamente);
    return;
}

function entrouNaSala (retorno_requisicao_usuario){

    if(retorno_requisicao_usuario === null || retorno_requisicao_usuario === undefined){
        usuario = prompt("Você preencheu o campo de forma inválida. Tente novamente.");
        requisicao_usuario = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', {name: usuario});
        requisicao_usuario.then(entrouNaSala); 
        requisicao_usuario.catch(tenteNovamente);
    }else {
        historicoMensagens(axios.get('https://mock-api.driven.com.br/api/v4/uol/messages'));

        return;
    }
}

function apagarCaixaDeTexto() {
    const input_mensagem =  document.querySelector('.campoEnviar');
    input_mensagem.value=null;
}

function enviarMensagem (){
    
    const input_mensagem =  document.querySelector('.campoEnviar');
    const texto_mensagem = input_mensagem.value;
    nova_mensagem = axios.post('https://mock-api.driven.com.br/api/v4/uol/messages',
    
        {from: usuario,
        to: "Todos",
        text: texto_mensagem,
        type: "message"}
    )
    
    setTimeout(apagarCaixaDeTexto, 500);
}

requisicao_usuario.then(entrouNaSala); //Chama função entrouNaSala, se a requisição não continha erros
requisicao_usuario.catch(tenteNovamente); //Chama função tentenovamente, se a requisição continha erros

mensagens_chat.then(historicoMensagens);
setInterval(function () {
    let historico = axios.get('https://mock-api.driven.com.br/api/v4/uol/messages');
    historico.then(historicoMensagens);}, 3000);


    requisicao_usuario.then(function () {
        setInterval(function () {
        let manter_conexao = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', {name: usuario});
        }, 5000)
    }
        );    


