const express = require('express')
const app = express()
const port = 3000

const users = [{
        "name": "Riikyuu",
        "slug": "riikyuu",
        "gender": "Male",
        "country": "Singapore",
        topGames: ["Aura Kingdom", "5983hrs"]
    },
    {
        "name": "xAstaroth",
        "slug": "xastaroth",
        "gender": "Male",
        "country": "Argentina",
        topGames: ["Warframe", "4385hrs"]
    },
    {
        "name": "Sentia",
        "slug": "sentia",
        "gender": "Female",
        "country": "Russia",
        topGames: ["Aura Kingdom", "3674hrs"]
    },
    {
        "name": "Beasthunter69",
        "slug": "beasthunter69",
        "gender": "Male",
        "country": "Germany",
        topGames: ["CSGO", "1521hrs"]
    },
    {
        "name": "xXKirito07Xx",
        "slug": "xXKirito07Xx",
        "gender": "Male",
        "country": "Germany",
        topGames: ["Tetris", "13521hrs"]
    }
];

const results = [{
        id: 1,
        name: "sensor",
        children: [
            { id: 2, name: "sensor", parent: 1 },
            {
                id: 3,
                name: "sensor",
                parent: 1,
                children: [{ id: 4, name: "sensor", parent: 3 }]
            }
        ]
    },
    { id: 5, name: "sensor", children: [{ id: 6, name: "sensor", parent: 5 }] }
];

app.use(express.static('public'))
app.set('view engine', 'ejs')

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

app.get('/main/matches', (req, res) => {
    res.render('matches', { title: "Matches", users })
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