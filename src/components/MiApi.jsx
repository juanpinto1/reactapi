import React, { useState, useEffect } from 'react';
import Search from './search';
import '../sass/ListadoPokemon.scss';

const PokemonList = () => {
const [pokemonList, setPokemonList] = useState([]);
const [nextPage, setNextPage] = useState(null);
const [prevPage, setPrevPage] = useState(null);
const [offset, setOffset] = useState(0);
const [sortedList, setSortedList] = useState([]);


useEffect(() => {
    const fetchPokemonList = async () => {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`);
        const data = await response.json();
        setPokemonList(data.results);
        setNextPage(data.next);
        setPrevPage(data.previous);
        setSortedList(data.results);
    } catch (error) {
        console.error('Error fetching Pokemon list:', error);
    }
    };

    fetchPokemonList();
}, [offset]);

const getPokemonImageUrl = (pokemonId) => {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;
};

const loadMorePokemon = () => {
    if (nextPage) {
    const newOffset = offset + 20;
    setOffset(newOffset);
    }
};

const loadPrevPokemon = () => {
    if (prevPage) {
    const newOffset = offset - 20;
    setOffset(newOffset >= 0 ? newOffset : 0);
    }
};

const loadMultiplePages = async () => {
    if (nextPage) {
    try {
        const response = await fetch(nextPage);
        const data = await response.json();


        const uniqueResults = data.results.filter(
        (result) => !pokemonList.some((pokemon) => pokemon.url === result.url)
        );

        setPokemonList((prevList) => [...prevList, ...uniqueResults]);
        setNextPage(data.next);
        setPrevPage(data.previous);
        setSortedList((prevSortedList) => [...prevSortedList, ...uniqueResults]);
    } catch (error) {
        console.error('Error fetching Pokemon list:', error);
    }
    }
};

return (
    <>
    <Search pokemonList={pokemonList} setSortedList={setSortedList} />
    <div className='list'>
        <div className='list2'>
        <h1 className='title'>Pokemones Encontrados</h1>
        <ul className='pokemon__table'>
            {sortedList.map((pokemon, index) => {
            const pokemonId = pokemon.url.split('/').slice(-2, -1)[0];
            const imageUrl = getPokemonImageUrl(pokemonId);
            return (
                <li className='pokemon' key={index}>
                {pokemon.name}
                {imageUrl && <img className='pokemon__img' src={imageUrl} alt={pokemon.name} />}
                </li>
            );
            })}
        </ul>
        </div>
    </div>
    <div className='buttons-container'>
        <button className='btn1' onClick={loadPrevPokemon} disabled={!prevPage}>
        Pagina Anterior
        </button>
        <button className='btn1' onClick={loadMorePokemon} disabled={!nextPage}>
        Siguiente Pagina
        </button>
        <button className='btn1' onClick={loadMultiplePages}>
Agregar Más Páginas
</button>
    </div>
    </>
);
};

export default PokemonList;