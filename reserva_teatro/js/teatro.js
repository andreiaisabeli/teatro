const frm = document.querySelector("form");
const dvPalco = document.querySelector("#divPalco");

//numero de poltronas
const POLTRONAS = 240;

//vetor c as poltronas reservadas 
const reservadas = [];

window.addEventListener("load", () =>{

    //se houver dados salvos em localstorage, faz um split(";") e atribui esses dados ao array, caso contrario, inicializaremos
    const ocupadas = localStorage.getItem("teatroOcupadas")
    ? localStorage.getItem("teatroOcupadas").split(";") : [];

    //montar o numero total de polt.
    for (let i = 1; i <= POLTRONAS; i++){
        const figure = document.createElement("figure"); //cria a tag figura
        const imgStatus = document.createElement("img"); //cria a tag img

        //se a posicao estiver ocupada, exibe a  img ocupada, se nao, a img escolhida
        imgStatus.src = ocupada
    }
})
