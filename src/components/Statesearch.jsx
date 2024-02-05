import React, { useState, useEffect } from 'react';
import '../sass/ListadoPokemon.scss';

const MiApi = () => {
  const [pokemonResults, setPokemonResults] = useState([]);
  

  const handlePokemonSearch = () => {
    if (chosenPokemon !== '') {
      const route = `https://pokeapi.co/api/v2/pokemon/${chosenPokemon.toLowerCase()}`;
      fetch(route)
        .then((response) => response.json())
        .then((formattedResponse) => {
          setPokemonResults([formattedResponse]);
          setSelectedPokemonList((prevList) => [...prevList, formattedResponse]);
        })
        .catch((error) => console.log(error));
    } else {
      setPokemonResults([]);
    }
  };

  return (
    <>
    
      <ul>
        {pokemonResults.map((pokemon) => (
          <li key={pokemon.id}>
            <h3>{pokemon.name}</h3>
            <img src={getPokemonImageUrl(pokemon.id)} alt={pokemon.name} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default MiApi;