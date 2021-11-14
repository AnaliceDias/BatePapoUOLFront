let usuario = prompt("Digite seu nome de usuário");

let requisicao_usuario = axios.post('https://mock-api.driven.com.br/api/v4/uol/participants', {name: usuario});

let status_usuario = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', {name: usuario});

const chat = document.querySelector("main");

const aux_horario = new Date();

let horario = {horas: "00", minutos: "00", segundos: "00"};

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
        coletaHoras();

        chat.innerHTML = `
        <div class='notificacao'>
        <div class='horario'>${'('+horario.horas+':'+horario.minutos+':'+horario.segundos+')'}</div>
        <div class='usuario'>${usuario}</div>
        <div class='conteudo_notificacao'>entrou na sala</div>
        </div>
        `
        return;
    }
}

requisicao_usuario.then(entrouNaSala); //Chama função entrouNaSala, se a requisição não continha erros
requisicao_usuario.catch(tenteNovamente); //Chama função tentenovamente, se a requisição continha erros

function tratar_erro_status(erro) {
    
    const statusCode = erro.response.status;
    //console.log(erro);
    console.log(statusCode);
    /*if(statusCode===400) {
        console.log("ignorei");
        return;
    }else {
        caiu();
    }*/
    //console.log(`${usuario} caiu`)
}

function verificacao_status (){ //#StandBy
    status_usuario = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', {name: usuario});

    //status_usuario.then(console.log("a mãe tá on"));
    //status_usuario.catch(tratar_erro_status);

}

setInterval(verificacao_status,5000);
//setInterval(location.reload(false), 5000);



