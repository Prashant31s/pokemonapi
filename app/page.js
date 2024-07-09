"use client";

import { useState } from "react";
import useFetchPokemon from "./api/pokemon";

export default function Home() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [offset, setOffset] = useState(0);
  const limit = 10;
  const { cardsData, loading, error } = useFetchPokemon(offset, limit);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleNextPage = () => {
    setOffset(offset + limit);
  };

  const handlePrevPage = () => {
    if (offset >= limit) {
      setOffset(offset - limit);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black ">
      <div className=" m-2 flex flex-row justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2"
          onClick={handlePrevPage}
          disabled={offset === 0}
        >
          Prev
        </button>
        <h2 className="text-3xl font-bold mb-4 text-white">
           Pokemon Cards 
        </h2>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>

      <div className="grid h-screen grid-cols-2 md:grid-cols-3 lg:grid-cols-5 justify-stretch gap-4 scroll-y-auto mb-2">
        {cardsData.map((pokemon, index) => (
          <div
            key={pokemon.id}
            className={`pokemon-card ${hoveredCard === index ? "hovered" : ""}`}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="card-inner">
              <div className="card-front">
                <h2 className="text-xl font-bold mb-2">{pokemon.name}</h2>
                <img
                  src={pokemon.imageUrl}
                  alt={pokemon.name}
                  className="mx-auto"
                  style={{ width: "150px", height: "150px" }}
                />
                <h3 className="text-lg font-semibold mt-2 ">Abilities:</h3>
                <ul className="list-disc ml-4">
                  {pokemon.abilities.map((ability, index) => (
                    <li key={index} className="text-sm">
                      {ability}
                    </li>
                  ))}
                </ul>
                <h1>Height: {pokemon.height}</h1>
              </div>
              <div
                className="card-back"
                style={{
                  backgroundImage: `url(${"https://tcg.pokemon.com/assets/img/expansions/sword-shield/header/header-medium-shield.jpg"})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <img
                  src={"https://cdn.worldvectorlogo.com/logos/pokemon-23.svg"}
                  alt={"pokemon"}
                  className="justify-center items-center mt-[280px]"
                  style={{ width: "150px", height: "150px" }}
                />
                {/* Additional details or content for the back side of the card */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
