const mysql = require("mysql2")

// const pool = mysql.createPool({
//     host: "127.0.0.1",
//     user: "root",
//     password: "jatinjain",
//     database: "movie_clicks"
// }).promise()

const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "jatinjain",
    database: "movie_clicks"
})

// async getMostClicked = () => {

//     const [rows] = await pool.query("SELECT * FROM clicks ORDER BY clicks")
//     return rows;
// }
// const mostClicked = await getMostClicked()

const mostClicked = (callBackFunc) => {
    connection.query(
        "SELECT * FROM clicks ORDER BY clicks DESC LIMIT 20",
        (error, results) => {
            console.log(results);
            callBackFunc(results);
            // return results;
        }
    )
}

const insertFirstClick = (imdbID) => {
    connection.query(
        `INSERT INTO clicks(imdbID, clicks) values ("${imdbID}", 1)`,
        (error, results) => {
            console.log("Inserted " + imdbID)
        }
    )

}

// const imdbID = "tt21615164"

const updateClick = (imdbID) => {
    if (imdbID === "") return;
    connection.query(
        `update clicks set clicks=clicks+1 where imdbID="${imdbID}"`,
        (error, results) => {
            if (results.affectedRows === 0) {
                console.log("Id not in database, inserting...")
                insertFirstClick(imdbID)
            }
            else {
                console.log("Click incremented")
            }
        }
    )
}
// insertFirstClick(imdbID)
// mostClicked()
exports.updateClick = updateClick
exports.mostClicked = mostClicked