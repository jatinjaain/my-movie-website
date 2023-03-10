import React, { useState } from 'react'
import "./Search.css";


const Search = (props) => {
    const [query, setQuery] = useState("")

    const searchMovie = () => {
        props.setSearch(query)
        setQuery("")
    }
    const reset = () => {
        setQuery("")
        props.setSearch("")
    }

    const handleChange = (event) => {
        setQuery(event.target.value)
    }

    return (
        <div className='SearchInput'>
            <button id="resetButton" onClick={() => { reset() }}>Home</button>
            <label>
                Search Movie
            </label>
            <input value={query} onChange={handleChange} type="text" />
            <button id="searchButton" onClick={() => { searchMovie() }}>Search</button>
        </div>
    )
}

export default Search