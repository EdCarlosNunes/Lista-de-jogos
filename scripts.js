// Função para abrir o formulário flutuante
function openForm() {
    document.getElementById("myForm").classList.add("show");
}

// Função para fechar o formulário flutuante
function closeForm() {
    document.getElementById("myForm").classList.remove("show");
}

// Função para adicionar um novo jogo à lista
function addGame() {
    // Obtenha os valores do formulário
    var gameName = document.getElementById("gameName").value;
    var startDate = document.getElementById("startDate").value;
    var endDate = document.getElementById("endDate").value;
    var rating = document.getElementById("rating").value;
    var description = document.getElementById("description").value;
    var consolePlayed = document.getElementById("consolePlayed").value;
    var imageUrl = document.getElementById("imageUrl").value;

    // Criar um novo elemento de jogo
    var gameItem = document.createElement("div");
    gameItem.className = "game-item";

    // Criar a imagem
    var image = document.createElement("img");
    image.src = imageUrl;

    // Criar as informações do jogo
    var gameInfo = document.createElement("div");
    gameInfo.className = "game-info";
    gameInfo.innerHTML = `
        <p><strong>Nome do Jogo:</strong> ${gameName}</p>
        <p><strong>Data de Início:</strong> ${startDate}</p>
        <p><strong>Data de Término:</strong> ${endDate}</p>
        <p><strong>Avaliação:</strong> ${rating}/10</p>
        <p><strong>Descrição:</strong> ${description}</p>
        <p><strong>Console Jogado:</strong> ${consolePlayed}</p>
    `;

    // Adicionar botões de Editar e Excluir
    var editButton = createEditButton();
    var deleteButton = createDeleteButton();

    gameInfo.appendChild(editButton);
    gameInfo.appendChild(deleteButton);

    // Adicionar imagem e informações ao elemento do jogo
    gameItem.appendChild(image);
    gameItem.appendChild(gameInfo);

    // Adicionar o elemento do jogo à lista
    document.getElementById("gameList").appendChild(gameItem);

    // Fechar o formulário
    closeForm();
}

// Função para criar o botão de Editar
function createEditButton() {
    var editButton = document.createElement("button");
    editButton.innerHTML = "Editar";
    editButton.className = "edit-btn";
    editButton.onclick = function () {
        editGame(this.parentNode.parentNode); // Chama a função de edição passando o elemento do jogo como parâmetro
    };
    return editButton;
}

// Função para criar o botão de Excluir
function createDeleteButton() {
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Excluir";
    deleteButton.className = "delete-btn";
    deleteButton.onclick = function () {
        deleteGame(this.parentNode.parentNode); // Chama a função de exclusão passando o elemento do jogo como parâmetro
    };
    return deleteButton;
}

// Função de edição (a ser implementada conforme necessário)
function editGame(gameElement) {
    // Implemente a lógica de edição conforme necessário
    // Você pode abrir um novo formulário de edição ou fazer as modificações diretamente no elemento existente
    // Exemplo: alert("Implemente a lógica de edição aqui");
}

// Função de exclusão (a ser implementada conforme necessário)
function deleteGame(gameElement) {
    // Remova o elemento do jogo da lista
    gameElement.remove();
    // Implemente a lógica de exclusão conforme necessário
    // Exemplo: alert("Implemente a lógica de exclusão aqui");
}

// Adiciona a funcionalidade de edição

function editGame(gameElement) {
    // Obtém as informações do jogo a partir do elemento do jogo
    var gameInfo = gameElement.querySelector(".game-info");
    var name = gameInfo.querySelector("p:nth-child(1)").textContent.replace("Nome do Jogo: ", "");
    var startDate = gameInfo.querySelector("p:nth-child(2)").textContent.replace("Data de Início: ", "");
    var endDate = gameInfo.querySelector("p:nth-child(3)").textContent.replace("Data de Término: ", "");
    var rating = gameInfo.querySelector("p:nth-child(4)").textContent.replace("Avaliação: ", "").replace("/10", "");
    var description = gameInfo.querySelector("p:nth-child(5)").textContent.replace("Descrição: ", "");
    var consolePlayed = gameInfo.querySelector("p:nth-child(6)").textContent.replace("Console Jogado: ", "");
    var imageUrl = gameElement.querySelector("img").src;

    // Preenche o formulário de edição com as informações do jogo
    document.getElementById("editGameName").value = name;
    document.getElementById("editStartDate").value = startDate;
    document.getElementById("editEndDate").value = endDate;
    document.getElementById("editRating").value = rating;
    document.getElementById("editDescription").value = description;
    document.getElementById("editConsolePlayed").value = consolePlayed;
    document.getElementById("editImageUrl").value = imageUrl;

    // Armazena o índice do jogo sendo editado em um campo oculto
    var gameList = document.getElementById("gameList");
    var index = Array.from(gameList.children).indexOf(gameElement);
    document.getElementById("editIndex").value = index;

    // Abre o formulário de edição
    document.getElementById("editForm").classList.add("show");
}

// Adiciona a funcionalidade para atualizar o jogo após a edição
function updateGame() {
    var index = document.getElementById("editIndex").value;
    var gameElement = document.getElementById("gameList").children[index];

    // Atualiza as informações do jogo com os valores do formulário de edição
    gameElement.querySelector(".game-info p:nth-child(1)").textContent = "Nome do Jogo: " + document.getElementById("editGameName").value;
    gameElement.querySelector(".game-info p:nth-child(2)").textContent = "Data de Início: " + document.getElementById("editStartDate").value;
    gameElement.querySelector(".game-info p:nth-child(3)").textContent = "Data de Término: " + document.getElementById("editEndDate").value;
    gameElement.querySelector(".game-info p:nth-child(4)").textContent = "Avaliação: " + document.getElementById("editRating").value + "/10";
    gameElement.querySelector(".game-info p:nth-child(5)").textContent = "Descrição: " + document.getElementById("editDescription").value;
    gameElement.querySelector(".game-info p:nth-child(6)").textContent = "Console Jogado: " + document.getElementById("editConsolePlayed").value;
    gameElement.querySelector("img").src = document.getElementById("editImageUrl").value;

    // Fecha o formulário de edição
    closeEditForm();
}

// Adiciona a funcionalidade para fechar o formulário de edição
function closeEditForm() {
    document.getElementById("editForm").classList.remove("show");
}



document.addEventListener('DOMContentLoaded', function() {
    // Função para carregar a lista de jogos
    function carregarListaJogos() {
        var listaUl = document.getElementById('lista-jogos');

        if (listaUl) {
            var listaJogos = JSON.parse(localStorage.getItem('listaJogos')) || [];
            listaUl.innerHTML = ''; // Limpa a lista antes de recriá-la

            listaJogos.forEach(function(jogo) {
                var listItem = document.createElement('li');
                listItem.textContent = jogo;
                listaUl.appendChild(listItem);
            });
        }
    }

    // Função para adicionar um novo jogo
    function adicionarJogo() {
        var novoJogoInput = document.getElementById('novo-jogo');
        var novoJogo = novoJogoInput.value.trim();

        if (novoJogo) {
            // Adiciona o novo jogo ao armazenamento local
            var listaJogos = JSON.parse(localStorage.getItem('listaJogos')) || [];
            listaJogos.push(novoJogo);
            localStorage.setItem('listaJogos', JSON.stringify(listaJogos));

            // Chama a função para carregar a lista de jogos novamente
            carregarListaJogos();

            // Limpa o campo de entrada
            novoJogoInput.value = '';
        }
    }

    // Chama a função para carregar a lista de jogos
    carregarListaJogos();

    // Adiciona um listener para o formulário
    document.getElementById('form-novo-jogo').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o envio padrão do formulário
        adicionarJogo();
    });
});


