function tratar_erro_status(erro) {
    
    const statusText = erro.response.statusText;
    
    console.log(statusText);

    if(statusText==="OK") {
        console.log("ignorei");
        return;
    }else {
        console.log(`${usuário + 'caiu'}`);
    }
    //console.log(`${usuario} caiu`)
}

function verificacao_status (){ //#StandBy
    status_usuario = axios.post('https://mock-api.driven.com.br/api/v4/uol/status', {name: usuario});

    //status_usuario.then(console.log("a mãe tá on"));
    //status_usuario.catch(tratar_erro_status);

}//setInterval(verificacao_status,5000);
//setInterval(location.reload(false), 5000);