import axios from 'axios';
import React, { useEffect, useState } from 'react'



function Container() {
    const [data, setData] = useState(null)

const [pokemonList, setPokemonList] = useState([]);
  const poke = "balbasaur";
  useEffect(() => {
    console.log("s");
    fetch('https://pokeapi.co/api/v2/pokemon/84')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        
        //setLoading(false)
      })
      console.log("daaata",data);
    //const fetchData = async () => {
    //   try {
    //     // const apiii= pokemon(poke);
    //     //console.log("api fetch", apiii);
    //     console.log("start");
    //     const response = await axios.get("/api/pokemon");
    //     console.log("end");
    //     setPokemonList(response.data);
    //   } catch (error) {
    //     console.error("error fetching api data", error);
    //   }
    // };
    // fetchData();
  }, []);
  return (
    <div>
        heyy
      {/* <div>
        {pokemonList.map((pokemon, index) => (
          <div key={index} className="pokemon-card">
            <h3>pokemon.name</h3>
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                index + 1
              }.png`}
              alt={pokemon.name}
            />
          </div>
        ))}
      </div> */}
    </div>
  )
}

export default Container

