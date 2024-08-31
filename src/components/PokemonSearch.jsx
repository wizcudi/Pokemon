import React, {useState} from 'react'
import './PokemonSearch.css'
import PokemonCard from './PokemonCard.jsx'

export default function PokemonSearch() {

    const [pokemonSearch, setPokemonSearch] = useState({pokemon: ''})
    const [pokemonData,setPokemonData] = useState(null)
    // handle and display error messages
    const [error, setError] =useState(null)

    const [isLoading, setIsLoading] = useState(false)


    const handleChange = (e) => {
        const {name,value} = e.target;
        setPokemonSearch(prevState => ({
            ...prevState,
            [name]: value
        }))
        // Clear any previous errors when the input changes
        setError(null) 
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //test
        // console.log(pokemonSearch);

        // server side code
        if (!pokemonSearch.pokemon.trim()) {
            setError("Please enter a Pokemon name or ID")
            return
        }
        fetchPokemon(pokemonSearch.pokemon.toLowerCase().trim())

        // clears input field after submission
        setPokemonSearch({
            pokemon: '',
        })
    }

    const fetchPokemon = (nameOrId) => {
        setIsLoading(true)
        setError(null)
        const url = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${nameOrId}`
    
        fetch(url) 
            .then((res)=>{  
                if (!res.ok) {
                    throw new Error("Pokémon not found. Please check the name or ID and try again.")
                }
                return res.json()
            })
    
            .then((data)=>{
                console.log(data)
                setPokemonData(data)
                // setError(null)      
            })
    
            .catch((err)=>{
                // alert("Pokémon not found")
                console.error("Error fetching Pokemon:", err);
                setPokemonData(null)
                setError(err.message)
            })
            .finally(() => {
                setIsLoading(false)
            });
    
    }





    return (
        <div className='search-container'>
            <h1 className='search-h1'>Pokemon Search</h1>
            
            <form onSubmit={handleSubmit} className='search-form'>
                <input 
                    name='pokemon'
                    className="search-input" 
                    placeholder='Type Name or ID' 
                    value={pokemonSearch.pokemon}
                    onChange={handleChange}
                    required 
                />
                <button type='submit' className="search-button" disabled={isLoading}>
                    {isLoading ? 'Searching...' : 'Search'}
                </button>
            </form>

            {error && <p className="error-message">{error}</p>}
            {isLoading && <p className="loading-message">Loading Pokemon data...</p>}
            {pokemonData && <PokemonCard pokemon={pokemonData} />}

        </div>
    )
}
