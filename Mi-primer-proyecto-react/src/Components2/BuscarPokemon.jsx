import React, { useState } from 'react';

export default function BuscarPokemon() {

    const [nombre, setNombre] = useState('');
    const [pokemon, setPokemon] = useState(null);

    //fect de pokemon  busqueda por nombre
    const buscarPokemon = async () => {
        try {
            const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`
            );
            const data = await response.json();
            setPokemon(data);
        } catch (error) {
            console.error('Error al buscar el pokemon:', error);
            setPokemon(null);
        }
    };

    //renderizamos  el componente
    return (
        <div>
            <h1>Buscar Pokemón</h1>
            <input
                type="text"
                placeholder="Escriba un pokemón"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />

            <button onClick={buscarPokemon}>Buscar</button>

            {pokemon && (
                <div>
                    <h2>{pokemon.name}</h2>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <p>Altura: {pokemon.height}</p>
                    <p>Peso: {pokemon.weight}</p>
                </div>
            )}
        </div>
    );
}