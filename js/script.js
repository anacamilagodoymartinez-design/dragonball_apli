const url = "https://dragonball-api.com/api/characters?limit=10";
const catalogo = document.getElementById("catalogo");
const filtro = document.getElementById("filtroRaza");

let personajes = [];

fetch(url)
.then(res => res.json())
.then(data => {
    personajes = data.items;
    mostrarCatalogo(personajes);
    llenarFiltro(personajes);
});

function mostrarCatalogo(lista){
    catalogo.innerHTML="";

    lista.forEach(p => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="${p.image}">
            <h3>${p.name}</h3>
            <p>${p.race}</p>
        `;

        card.onclick = ()=> abrirModal(p);

        catalogo.appendChild(card);
    });
}

function llenarFiltro(lista){
    const razas = [...new Set(lista.map(p=>p.race))];

    razas.forEach(r=>{
        const op=document.createElement("option");
        op.value=r;
        op.textContent=r;
        filtro.appendChild(op);
    });
}

filtro.onchange = ()=>{
    if(filtro.value==="todos"){
        mostrarCatalogo(personajes);
    }else{
        const filtrados = personajes.filter(p=>p.race===filtro.value);
        mostrarCatalogo(filtrados);
    }
};

const modal=document.getElementById("modal");
const cerrar=document.getElementById("cerrar");

function abrirModal(p){
    document.getElementById("nombreModal").textContent=p.name;
    document.getElementById("genderModal").textContent=p.gender;
    document.getElementById("descModal").textContent=p.description;
    modal.style.display="block";
}

cerrar.onclick=()=> modal.style.display="none";
window.onclick=e=>{
    if(e.target==modal) modal.style.display="none";
};
