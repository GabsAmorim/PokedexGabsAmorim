const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const buttonInfo = document.querySelector('.btn-info');

let searchPokemon = 4;
// função para buscar na PokeApi o pokemon pelo seu numero ou nome cadastrado na API
// A função fetch pokemon é uma função assincrona, ou seja, ela irá te retornar uma promessa
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIResponse.status == 200) {
        const data = await APIResponse.json();
        return data;
    }

}
//função para renderizar os dados na tela

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    // para saber de onde buscar a data, é necessário ir até o resource da API e verificar como a informação que você quer está declarada
    if (data) {

        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
    } else {
        pokemonName.innerHTML = 'Not Found Bro';
        pokemonNumber.innerHTML = '';
    }
}
// função para enviar os dados do formulário a partir da ação de submit
form.addEventListener('submit', (event) => {
    //bloqueando o evento padrão do formulário no HMTL
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});
//section de eventos para os botões
buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);

});


renderPokemon(searchPokemon);


