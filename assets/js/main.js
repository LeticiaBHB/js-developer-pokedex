const pokemonList = document.getElementById('pokemonList');
const typeFilter = document.getElementById('typeFilter');
const filterButton = document.getElementById('filterButton');
const sortOrderSelect = document.getElementById('sortOrder');
const loadThreshold = 200;
let offset = 0;
const limit = 20;
const maxRecords = 105;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}


function loadPokemonItems() {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
        offset += limit;
    });
}

// Função para verificar se o usuário chegou ao final da página
function isEndOfPage() {
    return window.innerHeight + window.scrollY >= document.body.offsetHeight - loadThreshold;
}

// Carregar Pokémon adicionais quando o usuário chegar ao final da página
window.addEventListener('scroll', () => {
    if (isEndOfPage() && offset < maxRecords) {
        loadPokemonItems();
    }
});

// Adicione o evento de clique ao botão de filtro
filterButton.addEventListener('click', () => {
    filterPokemonByType();
});

// Função para filtrar os Pokémon com base no tipo selecionado
function filterPokemonByType() {
    const selectedType = typeFilter.value;
    const pokemonItems = document.querySelectorAll('.pokemon');

    pokemonItems.forEach((item) => {
        const pokemonType = item.classList[1];
        if (selectedType === 'all' || selectedType === pokemonType) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Adicione um evento de mudança ao elemento de seleção de ordem de classificação
sortOrderSelect.addEventListener('change', () => {
    sortPokemon();
});

// Função para reordenar os Pokémon com base na opção selecionada
function sortPokemon() {
    const selectedSortOrder = sortOrderSelect.value;
    const pokemonItems = Array.from(document.querySelectorAll('.pokemon'));

    pokemonItems.sort((a, b) => {
        const nameA = a.querySelector('.name').textContent.toLowerCase();
        const nameB = b.querySelector('.name').textContent.toLowerCase();

        if (selectedSortOrder === 'az') {
            return nameA.localeCompare(nameB);
        } else if (selectedSortOrder === 'za') {
            return nameB.localeCompare(nameA);
        }

        return 0;
    });

    // Remova os Pokémon existentes da lista
    pokemonItems.forEach((item) => {
        item.remove();
    });

    // Adicione os Pokémon reordenados de volta à lista
    pokemonItems.forEach((item) => {
        pokemonList.appendChild(item);
    });
}


// Carregar os primeiros Pokémon ao carregar a página
loadPokemonItems();


/////BACKGROUNDCOLOR/////
// Função para alterar a cor de fundo aleatoriamente
// Função para gerar uma cor de fundo aleatória
function getRandomBackgroundColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Função para alterar a cor de fundo aleatoriamente
function changeBackgroundColor() {
    const randomColor = getRandomBackgroundColor();
    document.body.style.backgroundColor = randomColor;
}

// Adicione um evento de rolagem à página para chamar a função de mudança de cor
window.addEventListener('scroll', changeBackgroundColor);

function changeBackgroundColor() {
    const randomColor = getRandomBackgroundColor();
    document.body.style.backgroundColor = randomColor;
}
