import React, { useEffect, useState } from "react";
import CardList from './components/CardList';
import Search from './components/Search';
import './App.css';
import MostSearched from "./components/MostSearched";


function App() {
  const [data, setData] = useState();
  const [err, setError] = useState("");
  const [search, setSearch] = useState("");
  const [idForDetail, setIdForDetail] = useState("");
  const [detailsForId, setDetailsForId] = useState("");

  const server_uri = "http://www.localhost:8000"

  useEffect(() => {
    fetchSearchData(search)
  }, [search])

  useEffect(() => {
    findDetailsForId(idForDetail)
  }, [idForDetail])


  const fetchSearchData = (movie) => {
    console.log(`making request for query ${movie}`)
    fetch(`${server_uri}/search?movieName=${movie}`)
      .then((res) => {
        // JSON.parse(res)
        return res.json()
      })
      .then((jsonData) => {
        setDetailsForId("")
        setData(jsonData)
        console.log(jsonData)
      })
      .catch((err) => {
        console.log(err)
        setError(err);
      })
  }

  const findDetailsForId = (movieId) => {
    console.log(`making request for movieId ${movieId}`)
    fetch(`${server_uri}/movieById?movieId=${movieId}`)
      .then((res) => {
        return res.json()
      })
      .then((jsonData) => {
        console.log(jsonData)
        setDetailsForId(jsonData)
      })
      .catch((error) => {
        console.log(error)
        setError(error)
      })
  }

  // const fetchMostSearchedMovies = () => {
  //   fetch(`${server_uri}/mostSearchedMovies`)
  //     .then((res) => {
  //       return res.json()
  //     })
  //     .then((jsonData) => {
  //       console.log(jsonData)
  //       setMostSearchedList(jsonData)
  //     })
  // }

  // const fetchMostSearchedMovies = () => {
  //   fetch(`${server_uri}/mostSearchedMovies`)
  //     .then((res) => {
  //       return res.json()
  //     })
  //     .then((jsonData) => {
  //       console.log(jsonData)
  //       return (jsonData)
  //     })
  // }

  return (
    <div className="App">
      <Search setSearch={setSearch} />

      {/* {
        if(data == null)
           <p>loading</p>
      } */}

      {data == null ?
        <p>Loading</p> :
        (data.Response === "False" ?
          <MostSearched /> :
          <CardList dataArr={data?.Search} setIdForDetail={setIdForDetail} details={detailsForId.Plot} />
        )
      }
    </div>
  );
}

export default App;
