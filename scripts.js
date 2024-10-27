// Dados fictícios de software em blocos e salas
const data = {
    "Bloco 1": {
        "Sala 101": ["Software A", "Software B"],
        "Sala 102": ["Software C"],
        "Sala 103": ["Software A", "Software D"]
    },
    "Bloco 2": {
        "Sala 201": ["Software E"],
        "Sala 202": ["Software A", "Software F"]
    },
    "Bloco 3": {
        "Sala 301": ["Software G"],
        "Sala 302": ["Software A", "Software H"]
    }
};

// Função para buscar o software
function searchSoftware() {
    const query = document.getElementById("search-input").value.trim().toLowerCase();
    const resultsList = document.getElementById("results-list");
    resultsList.innerHTML = "";

    if (!query) return;

    let found = false;

    // Busca o software em cada bloco e sala
    for (const bloco in data) {
        for (const sala in data[bloco]) {
            if (data[bloco][sala].some(software => software.toLowerCase() === query)) {
                found = true;
                const resultItem = document.createElement("li");
                resultItem.textContent = `Software encontrado no ${bloco}, ${sala}`;
                resultsList.appendChild(resultItem);
            }
        }
    }

    if (!found) {
        const noResult = document.createElement("li");
        noResult.textContent = "Software não encontrado.";
        resultsList.appendChild(noResult);
    }
}

// Função para exibir salas do bloco selecionado
function selectBloco(bloco) {
    const titulo = document.getElementById("detalhes-titulo");
    titulo.textContent = `Salas do ${bloco}`;
    const salasContainer = document.getElementById("salas-container");
    salasContainer.innerHTML = "";

    const salas = data[bloco];
    for (const sala in salas) {
        const salaDiv = document.createElement("div");
        salaDiv.className = "sala";
        salaDiv.textContent = sala;
        salaDiv.onclick = () => showSoftwares(bloco, sala);
        salasContainer.appendChild(salaDiv);
    }

    document.getElementById("blocos-container").style.display = "none";
    document.getElementById("detalhes-container").style.display = "block";
}

// Função para exibir softwares instalados e opções de adicionar/excluir
function showSoftwares(bloco, sala) {
    const titulo = document.getElementById("detalhes-titulo");
    titulo.textContent = `${sala} - Softwares Instalados`;

    const salasContainer = document.getElementById("salas-container");
    salasContainer.innerHTML = "";

    const softwareList = data[bloco][sala];

    const ul = document.createElement("ul");
    softwareList.forEach((software, index) => {
        const li = document.createElement("li");
        li.textContent = software;

        // Botão de excluir
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.onclick = () => {
            softwareList.splice(index, 1);
            showSoftwares(bloco, sala);
        };

        li.appendChild(deleteButton);
        ul.appendChild(li);
    });

    salasContainer.appendChild(ul);

    // Input para adicionar novo software
    const addInput = document.createElement("input");
    addInput.id = "add-software-input";
    addInput.placeholder = "Novo software";

    const addButton = document.createElement("button");
    addButton.textContent = "Adicionar";
    addButton.onclick = () => {
        const newSoftware = addInput.value.trim();
        if (newSoftware) {
            softwareList.push(newSoftware);
            showSoftwares(bloco, sala);
            addInput.value = "";
        }
    };

    salasContainer.appendChild(addInput);
    salasContainer.appendChild(addButton);
}

// Voltar para a lista de blocos
function voltar() {
    document.getElementById("detalhes-container").style.display = "none";
    document.getElementById("blocos-container").style.display = "block";
}
