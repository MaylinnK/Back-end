
//--------------------------------------
// Defining variables                  -
//--------------------------------------
const express = require("express");
const app = express(); 
// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;
// eslint-disable-next-line no-unused-vars
const dotenv = require("dotenv").config();
const { MongoClient } = require("mongodb");
const games = ["Aura Kingdom", "Warframe", "CSGO", "Tetris"];


//----------------------------------------
// Connecting to MongoDB                 -
//----------------------------------------
let db = null;
// function connect DB
async function connectDB() {
  //get URI from .env file
  // eslint-disable-next-line no-undef
  const uri = process.env.DB_URI;
  //make connection to database
  const options = { useUnifiedTopology: true };
  const client = new MongoClient(uri, options);
  await client.connect();
  // eslint-disable-next-line no-undef
  db = await client.db(process.env.DB_NAME);
}



//----------------------------------------
// Filter                                -
//----------------------------------------
function filter() {
  // const currentGame = window.getElementById("game").value;
  // const arrayMatches = users.filter((users) => users.topGames === "Warframe");
  // console.log(currentGame);
  // console.log(arrayMatches);
}

filter();


//----------------------------------------
// Setting view engine                   -
//----------------------------------------
app.set("view engine", "ejs");


//----------------------------------------
// Middleware                            -
//----------------------------------------
app.use(express.static("public"))
app.use(express.json()); //Used to parse JSON bodies
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies



//----------------------------------------
// Routes                                -
//----------------------------------------
app.get("/", (req, res) => {
  res.render("login", { title: "" });
});

app.get("/main", (req, res) => {
  res.render("home", { title: ""});
});

app.get("/main/players", async (req, res) => {
  const query = {};
  const options = {sort: {topGames: -1}};
  const users = await db.collection('users').find(query, options).toArray();
  res.render("playerlist", { title: "Playerlist", users });
});

app.get("/main/match", (req, res) => {
  res.render("match", { title: "Pick game", games });
});

app.post("/main/match", async (req, res) => {
  const currentGame = req.body.currentgame;
  console.log(currentGame);
  const query = {topGame: currentGame};
  const options = {sort: {time: -1}};
  const users = await db.collection('users').find(query, options).toArray();
  res.render("playerlist", { title: "Matches", users });
});

// eslint-disable-next-line no-unused-vars
app.use(function (req, res, next) {
  res.status(404).render("error", {title: " "});
});


//----------------------------------------
// Starting server                       -
//----------------------------------------
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  connectDB()
.then(() => {
    //if succesful connection is made, show a message
    console.log('We have a connection to Mongo!')
})
// eslint-disable-next-line no-unused-vars
.catch(error => {
    //if connection is unsuccessful, show error
    console.log('error')
});
});
