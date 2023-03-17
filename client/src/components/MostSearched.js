import React, { useState } from 'react'
import "../styles/MostSearched.css"

const MostSearched = (props) => {

    const server_uri = "http://www.localhost:8000"

    const [mostSearchedList, setMostSearchedList] = useState([])
    const fetchMostSearchedMovies = () => {
        // console.log(mostSearchedList)
        if (mostSearchedList.length != 0) return;
        fetch(`${server_uri}/mostSearchedMovies`)
            .then((res) => {
                return res.json()
            })
            .then((jsonData) => {
                // console.log(jsonData)
                setMostSearchedList(jsonData)
            })
    }
    fetchMostSearchedMovies()
    return (
        <div>
            <h1>Most Searched Movies</h1>
            <div className="card-grid">
                {
                    mostSearchedList.map((movie, index) => {
                        return (
                            <div key={movie.imdbID} className="card">
                                <img className='poster' src={movie.poster} alt="Poster"></img>
                                <h3 className="title"> {index + 1 + ". " + movie.title} </h3>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MostSearched