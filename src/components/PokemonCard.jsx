import React from 'react'
import './PokemonCard.css'
import Stats from './Stats.jsx'

// accepcts pokemon as a prop from PokemonSearch.jsx
export default function PokemonCard({pokemon}) {
    return (
        <div className='card'>

            <div className='pokemon-header'>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} className='pokemon-image' />
                <h1 className='pokemon-name'>{pokemon.name}</h1>
                <h2 className='pokemon-id'>#{pokemon.id}</h2>
                <p className='pokemon-type'>{pokemon.types.map(t => t.type.name).join(', ')}</p>
            </div>

            <div className='main-stats'>
                <Stats 
                    title='Weight'
                    value={`${pokemon.weight / 10} kg`}
                />
                <Stats 
                    title='Height'
                    value={`${pokemon.height / 10} m`}
                />
            </div>

            <div className='stats-container'>
                {pokemon.stats.map((stat, index) => (
                    <Stats
                        key={index}
                        title={stat.stat.name.replace('-', ' ')}
                        value={stat.base_stat}
                    />
                ))}
            </div>

        </div>
    )
}
