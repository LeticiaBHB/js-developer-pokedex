const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon);
};

pokeApi.getPokemons = (offset = 0, limit = 151) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails);
};

pokeApi.getAllPokemons = async () => {
    const allPokemons = [];
    let offset = 0;
    const limit = 151; // Defina um valor adequado de limite por página

    while (true) {
        const pokemonsPage = await pokeApi.getPokemons(offset, limit);
        if (pokemonsPage.length === 0) {
            break;
        }
        allPokemons.push(...pokemonsPage);
        offset += limit;
    }

    return allPokemons;
};

// Agora você pode usar a função getAllPokemons para buscar todos os Pokémon disponíveis
pokeApi.getAllPokemons()
    .then((allPokemons) => {
        console.log(allPokemons);
    })
    .catch((error) => {
        console.error(error);
    });
