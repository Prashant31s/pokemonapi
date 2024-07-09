// useFetchPokemon.js (custom hook)

import { useState, useEffect } from "react";

const useFetchPokemon = (offset, limit) => {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
        );
        const data = await response.json();

        const promises = data.results.map(async (pokemon) => {
          const pokemonResponse = await fetch(pokemon.url);
          const pokemonData = await pokemonResponse.json();
          return {
            id: pokemonData.id,
            name: pokemonData.name,
            imageUrl: pokemonData.sprites.other.dream_world.front_default,
            backImageUrl: pokemonData.sprites.other.dream_world.front_default,
            imageHoverUrl: pokemonData.sprites.back_default,
            height: pokemonData.height,
            abilities: pokemonData.abilities.map((ability) => ability.ability.name),
          };
        });

        const updatedCardsData = await Promise.all(promises);
        setCardsData(updatedCardsData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [offset, limit]);

  return { cardsData, loading, error };
};

export default useFetchPokemon;
