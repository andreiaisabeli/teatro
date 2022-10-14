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

        if (i% 24 == 12) figure.style.marginRight = "60px"
        dvPalco.appendChild(figure);

        (i % 24 == 0) && dvPalco.appendChild(document.createElement("br"));
    }
})

frm.addEventListener("submit", (e) => {
    e.preventDefault();
    //obtem conteudo do input
    const poltrona = Number(frm.inPoltrona.value);

    //valida o preenchimento de entrada
    if(poltrona > POLTRONAS){
        alert("Informe um número de poltrona válido");
        frm.inPoltrona.focus();
        return;
    }

    const ocupadas = localStorage.getItem("teatroOcupadas")
    ? localStorage.getItem("teatroOcupadas").split(";")
    : [];

    //validar se a poltrona ja estiver ocupada

    if(ocupadas.includes(poltrona.toString())){
        alert(`Poltrona ${poltrona} já está ocupada`);
        frm.inPoltrona.value = "";
        frm.inPoltrona.focus();
        return;
    }

    //capturar a imagem da poltrona, filha de divPalco
    const imgPoltrona = dvPalco.querySelectorAll("img")[poltrona - 1];

    imgPoltrona.src = "img/reservada.jpg"; //modifica o atributo da img
    
    reservadas.push(poltrona); //adc a poltrona ao vetor
    
    frm.inPoltrona.value = "";
    frm.inPoltrona.focus();

});

frm.btConfirmar.addEventListener("click",() =>{
    //verificar se não a poltronas reservadas
    if(reservadas.length == 0){
        alert("Não a poltronas reservadas!!")
        frm.inPoltrona.focus()
        return;
    }
    const ocupadas = localStorage.getItem("teatroOcupadas")
    ? localStorage.getItem("teatroOcupadas").split(";")
    : [];

    //for decrescente, pois as reservadas vao sendo removidas a cada alteracao
    for (let i = reservadas.length - 1; i >= 0; i--){
        ocupadas.push(reservadas[i]);

        // captura a imagem da poltrona, filha e divPalco. É -1 pois começa em 0
        const imgPoltrona = dvPalco.querySelectorAll("img")[reservadas[i] - 1];
        // modifica a imagem
        imgPoltrona.src = "img/ocupada.jpg";
        // remove do vetor a reserva já alterada
        reservadas.pop()
    }
    localStorage.setItem("teatroOcupadas",ocupadas.join(";"));
});

frm.btCancelar.addEventListener("click", (e) => {
    e.preventDefault();
    //obtem conteudo do input
    const poltrona = Number(frm.inPoltrona.value); //parte do codigo de cima
    alert("Você deseja cancelar a reserva feita na poltrona " + poltrona + "?")
    frm.inPoltrona.focus
    const ocupadas = localStorage.getItem("teatroOcupadas");
  
    if (ocupadas.includes(poltrona.toString())) {
      const imgPoltrona = dvPalco.querySelectorAll("img")[poltrona - 1];
      imgPoltrona.src = "img/disponivel.jpg"; //modifica o atributo da img
      reservadas.pop();
      frm.inPoltrona.value = "";
      frm.inPoltrona.focus();
    }
  });


