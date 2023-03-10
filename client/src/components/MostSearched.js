import React, { useState } from 'react'

const MostSearched = (props) => {

    const server_uri = "http://www.localhost:8000"

    const [mostSearchedList, setMostSearchedList] = useState([])
    const fetchMostSearchedMovies = () => {
        console.log("aaaaaaaaaaaaaaa" + mostSearchedList)
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
            {
                mostSearchedList.map((movie) => {
                    return <p key={movie.imdbID}> {movie.imdbID} </p>
                })
            }
        </div>
    )
}

export default MostSearched