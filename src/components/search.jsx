import React, { useState, useEffect } from 'react';
import '../sass/search.scss'

const Search = ({ pokemonList, setSortedList }) => {
const [selectarpokemon, SetSelectarpokemon] = useState('');
const [originalList, setOriginalList] = useState(pokemonList);


useEffect(() => {
    setOriginalList(pokemonList);
}, [pokemonList]);

const handleSearch = () => {
    const filteredList = originalList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(selectarpokemon.toLowerCase())
    );
    setSortedList(filteredList);
};

const handleSort = () => {
    const sortedList = [...originalList].sort((a, b) =>
    a.name.localeCompare(b.name)
    );
    setSortedList(sortedList);
};

return (
    <div className='search'>
    <input className='input'
        type="text"
        placeholder="Ingresa el Pokemon"
        value={selectarpokemon}
        onChange={(e) => SetSelectarpokemon(e.target.value)}
    />
    <button  className="btnsearch" onClick={handleSearch}><strong>Buscar</strong></button>
    <button className="btnorden" onClick={handleSort}>Ordenar alfabéticamente a los pokemon</button>
    </div>
);
};

export default Search;
