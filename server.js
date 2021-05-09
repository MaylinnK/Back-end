const express = require('express')
const app = express()
const port = 3000

const users = [{
        "name": "Riikyuu",
        "slug": "riikyuu",
        "gender": "Male",
        "country": "Singapore",
        "topGames": ["1. Aura Kingdom", "2. Left 4 Dead 2", "3. Phasmophobia"],
        "topTimes": ["5983hrs", "578hrs", "309hrs"]
    },
    {
        "name": "xAstaroth",
        "slug": "xastaroth",
        "gender": "Male",
        "country": "Argentina",
        "topGames": ["1. Warframe", "2. Aura Kingdom", "3. Phasmophobia"],
        "topTimes": ["4385hrs", "3348hrs", "315hrs"]
    },
    {
        "name": "Sentia",
        "slug": "sentia",
        "gender": "Female",
        "country": "Russia",
        "topGames": ["1. Aura Kingdom", "2. Phasmophobia", "3. Nekopara"],
        "topTimes": ["3674hrs", "467hrs", "420hrs"]
    }
];

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('login', { title: "Sign in to your steam account" });
});

app.get('/main', (req, res) => {
    res.render('home', { title: "Home", users })
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