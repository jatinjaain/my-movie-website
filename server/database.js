const mysql = require("mysql2")
// const mysql = require("mysql2/promise")

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

// const mostClicked = async () => {
//     console.log("in most cliked databasae")
//     const connection = await mysql.createConnection({
//         host: "127.0.0.1",
//         user: "root",
//         password: "jatinjain",
//         database: "movie_clicks"
//     })
//     const [rows, fields] = await connection.execute(
//         "SELECT * FROM clicks ORDER BY clicks DESC LIMIT 20")
//     console.log(rows)
//     return rows
// }

const mostClicked = () => {
    // console.log("in db 1")

    return new Promise((resolve, reject) => {
        connection.query(
            "SELECT * FROM clicks ORDER BY clicks DESC LIMIT 20",
            (error, results) => {
                // console.log("in db 2")
                // console.log(results);
                // return new Promise((resolve, reject) => {
                //     resolve(results)
                // })
                // return setTimeout(() => results, 3000)
                resolve(results);
            }
        )
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