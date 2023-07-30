import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);

  const fetchPokemonList = async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
      setPokemonList(response.data.results);
    } catch (err) {
      console.error('Erro na busca de Pokémon:', err);
    }
  };

  const fetchMorePokemon = async () => {
    try {
      const nextUrl = pokemonList.length > 0 ? pokemonList[pokemonList.length - 1].url : null;
      if (nextUrl) {
        const response = await axios.get(nextUrl);
        setPokemonList((prevList) => [...prevList, ...response.data.results]);
      }
    } catch (err) {
      console.error('Erro ao buscar mais pokémons:', err);
    }
  };

  const handleScroll = () => {
    const isAtBottom =
      window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight;

    if (isAtBottom) {
      fetchMorePokemon();
    }
  };

  useEffect(() => {
    fetchPokemonList();
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <h2>Lista dos primeiros 20 Pokémon:</h2>
      <ul>
        {pokemonList.map((pokemon) => (
          <li key={pokemon.name}>{pokemon.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
