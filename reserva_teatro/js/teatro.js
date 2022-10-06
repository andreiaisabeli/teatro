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
        imgStatus.src = ocupadas.includes(i.toString())
        ? "img/ocupada.jpg"
        : "img/disponivel.jpg";
        imgStatus.className = "poltrona"; //classe com a dimensao da imagem

        const figureCap = document.createElement("figcaption"); 

        //numero de 0 antes do numero da poltrona
        const zeros = i < 10 ? "00" : i < 100 ? "0" : "";

        const num = document.createTextNode(`[${zeros}${i}]`); //cria o texto

        //define os pais de cada tag criada
        figureCap.appendChild(num);
        figure.appendChild(imgStatus);
        figure.appendChild(figureCap);
    }
})
