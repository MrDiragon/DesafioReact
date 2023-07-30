import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PokemonDetails = () => {
  const [pokemonNumber, setPokemonNumber] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPokemonData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonNumber}`);
      setPokemonData(response.data);
    } catch (err) {
      setError('Erro ao buscar os detalhes do Pokémon inserido. Veja se digitou o número correto. ');
    }

    setLoading(false);
  };

  useEffect(() => {
    if (pokemonNumber) {
      fetchPokemonData();
    }
  }, [pokemonNumber]);

  const handleInputChange = (event) => {
    setPokemonNumber(event.target.value);
  };

  return (
    <div>
      <input type="number" value={pokemonNumber} onChange={handleInputChange} />
      <button onClick={fetchPokemonData}>Buscar Pokémon</button>

      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}
      {pokemonData && (
        <div>
          <p>Nome do Pokémon: {pokemonData.name}</p>
          <p>Tipo do Pokémon:</p>
          <ul>
            {pokemonData.types.map((typeData) => (
              <li key={typeData.slot}>{typeData.type.name}</li>
            ))}
          </ul>
          <img
            src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokemonNumber}.png`}
            alt={`Imagem do Pokémon ${pokemonData.name}`}
          />
        </div>
      )}
    </div>
  );
};

export default PokemonDetails;
