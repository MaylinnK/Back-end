const express = require('express');
const app = express();
const port = 3000;
const dotenv = require('dotenv').config();

console.log(process.env.TESTVAR)

const users = [{
        "name": "Riikyuu",
        "slug": "riikyuu",
        topGames: ["Aura Kingdom", "5983hrs"]
    },
    {
        "name": "xAstaroth",
        "slug": "xastaroth",
        topGames: ["Warframe", "4385hrs"]
    },
    {
        "name": "Sentia",
        "slug": "sentia",
        topGames: ["Aura Kingdom", "3674hrs"]
    },
    {
        "name": "Beasthunter69",
        "slug": "beasthunter69",
        topGames: ["CSGO", "1521hrs"]
    },
    {
        "name": "xXKirito07Xx",
        "slug": "xXKirito07Xx",
        topGames: ["Tetris", "13521hrs"]
    }
];

const games = ["Aura Kingdom", "Warframe", "CSGO", "Tetris"]


function filter() {
    // const currentGame = window.getElementById("game").value;
    const arrayMatches = users.filter(users => users.topGames === "Warframe" )
    // console.log(currentGame);
    console.log(arrayMatches);
}

filter()

app.use(express.static('public'))
app.set('view engine', 'ejs')

//Middleware
app.use(express.urlencoded({ extended: true })); //Parse URL-encoded bodies
app.use(express.json()); //Used to parse JSON bodies

app.get('/', (req, res) => {
    res.render('login', { title: "" });
});

app.get('/main', (req, res) => {
    res.render('home', { title: "", users })
});

app.get('/main/gametimes', (req, res) => {
    res.render('gametime', { title: "Your gametimes", users })
});

app.get('/main/players', (req, res) => {
    res.render('playerlist', { title: "Playerlist", users })
});



app.get('/main/match', (req, res) => {
    res.render('match', { title: "Pick game", games })
});

app.post("/main/matches", function(req, res) {
    console.log(req.body.games);
  });



app.get('/main/matches', (req, res) => {
    res.render('matches', { title: "Matches", users })
    console.log(req.body.games);    
});

app.get('/main/matches/:userName', (req, res) => {
    const user = users.find(user => user.slug == req.params.userName);
    console.log(user)
    res.render('userdetails', { title: `Steam information about player ${user.name}`, user })
});

app.use(function(req, res, next) {
    res.status(404).send("Sorry, can't find that!")
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})