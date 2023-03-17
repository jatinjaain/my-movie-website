const express = require("express");
const { mostClicked, updateClick } = require("./database")
const cors = require("cors");
const request = require("request");
const dotenv = require("dotenv");
dotenv.config();
const app = express();

// app.set("view engine", "ejs")
// app.use(express.static("public"));
// app.use(express.json);
app.use(cors());

const port = process.env.PORT || 8000

// app.get('/', (req, res) => {
//     res.send("home ");
//     // res.render("home")
// })
// app.get('/about', (req, res) => {
//     res.send("about the website ");
// })
// app.get('/contact', (req, res) => {
//     res.send("contact me ");
// })

app.get('/search', (req, res) => {
    console.log(`Search request for ${req.query.movieName}`)
    const url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&s=${req.query.movieName}`;

    request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const data = JSON.parse(body);
            res.send(data);
            // res.render("result", {moviesDump: data})
        }
        else {
            res.send("Something went wrong");
        }
    })
})

app.get('/movieById', (req, res) => {
    console.log(`Get Details for movieId for ${req.query.movieId}`)
    const url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=${req.query.movieId}&plot=full`;
    // add or increment click for this id
    updateClick(req.query.movieId)
    request(url, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            const data = JSON.parse(body);
            // console.log(data);
            res.send(data);
        }
        else {
            res.send("Something went wrong");
        }
    })
})

app.get('/mostSearchedMovies', async (req, res) => {
    console.log(`Getting most searched movies from database`)
    const url = `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&i=`;
    // get 20 most clicked movies from database
    // for each id fetch the title and poster 
    // we need to return an list of id, title and poster


    const getDetailedArr = () => {
        let detailArr = mostClicked()
            .then(async (resultArr) => {
                // console.log(resultArr)

                const mostClickedArr = await Promise.all(resultArr.map(async (ele) => {
                    const eleWithDetail = fetch(url + ele.imdbID)
                        .then((res) => {
                            return res.json()
                        })
                        .then((jsonData) => {
                            // console.log(jsonData.Title + " " + ele.imdbID)
                            const tempEle = {}
                            tempEle.imdbID = ele.imdbID
                            tempEle.title = jsonData.Title
                            tempEle.poster = jsonData.Poster
                            return tempEle
                        })
                    return eleWithDetail
                }))
                return mostClickedArr
            }
            ).then((resArr) => {
                // console.log("in second then" + resArr)
                return resArr;
            }
            )
        // console.log(detailArr) // how is this promise
        return detailArr

    }

    getDetailedArr().then((resArr) => {
        // console.log("final" + resArr)
        res.send(resArr)
    }
    )
})




app.get('*', (req, res) => {
    res.send("404 NOT FOUND");
})

app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
})