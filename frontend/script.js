document.addEventListener("DOMContentLoaded", () => {

const characterImage = document.getElementById("characterImage");
const characterName = document.getElementById("characterName");
const randomBtn = document.getElementById("randomBtn");
const searchBtn = document.getElementById("searchBtn");
const characterInput = document.getElementById("characterInput");
const characterArea = document.querySelector(".character-area");

const API = "http://10.106.208.37:3000/api/personagens";

async function buscarPersonagens(url){

    characterArea.classList.add("loading");

    try{

        const response = await fetch(url);
        const data = await response.json();

        console.log(data);

        if(data.status === "error"){
            characterName.textContent = data.message;
            characterImage.src = "";
            return;
        }

        // coloca imagem
        characterImage.src = data.message;

        // pega personagem da URL
        const partes = data.message.split("/");
        const personagem = partes[4];

        characterName.textContent =
        personagem.charAt(0).toUpperCase() + personagem.slice(1);

    }
    catch(erro){

        console.error(erro);

        characterName.textContent =
        "⚠️ Servidor offline — rode: node server.js";

        characterImage.src = "";
    }
    finally{

        characterArea.classList.remove("loading");

    }

}


// =================
// AÇÕES
// =================

function personagemAleatorio(){
    buscarPersonagens(`${API}/aleatorio`);
}

function buscarPorTipo(){

    const tipo = characterInput.value.trim().toLowerCase();

    if(!tipo){
        alert("Digite um personagem!");
        return;
    }

    buscarPersonagens(`${API}/${tipo}`);
}


// =================
// EVENTOS
// =================

randomBtn.addEventListener("click", personagemAleatorio);

searchBtn.addEventListener("click", buscarPorTipo);

characterImage.addEventListener("click", personagemAleatorio);

characterInput.addEventListener("keypress",(event)=>{

    if(event.key === "Enter"){
        buscarPorTipo();
    }

});


// =================
// CARREGA AO ABRIR
// =================

personagemAleatorio();

});