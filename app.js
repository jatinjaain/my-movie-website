const express = require("express");
const request = require("request")
const app = express();

app.set("view engine", "ejs")
app.use( express.static( "public" ) );

app.get('/', (req, res)=>{
    // res.send("home ");
    res.render("home")
})
app.get('/about', (req, res)=>{
    res.send("about the website ");
})
app.get('/contact', (req, res)=>{
    res.send("about the website ");
})

app.get('/result', (req,res)=>{
    // res.send(`you searched for ${req.query.movieName}`)
    const url =`http://www.omdbapi.com/?apikey=34ac3b6e&s=${req.query.movieName}`;
    request(url, function(error, response, body){
        if(!error && response.statusCode===200){
            const data = JSON.parse(body);
            // res.send(data);
            res.render("result", {moviesDump: data})
        }
        else{
            res.send("something went wrong");
        }
    })
})

app.get('*', (req, res)=>{
    res.send("404 NOT FOUND");
})

app.listen(8000, ()=>{
    console.log("server has started");
})