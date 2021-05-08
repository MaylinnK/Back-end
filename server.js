const express = require('express')
const app = express()
const port = 3000

const users = [{
  "name": "Riikyuu",
  "slug": "riikyuu",
  "top-games": ["1. Aura Kingdom", "2. Left 4 Dead 2", "3. Phasmophobia"],
  "top-times": ["5983hrs", "578hrs", "309hrs"]
},
{
  "name": "xAstaroth",
  "slug": "xastaroth",
  "top-games": ["1. Warframe", "2. Aura Kingdom", "3. Phasmophobia"],
  "top-times": ["4385hrs", "3348hrs", "315hrs"]
},
{
  "name": "Sentia",
  "slug": "sentia",
  "top-games": ["1. Aura Kingdom", "2. Phasmophobia", "3. Nekopara"],
  "top-times": ["3674hrs", "467hrs", "420hrs"]
}
];

app.use(express.static('public'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render('home', {title: "Homepage"});
})

app.get('/main', (req, res) => {
  res.send('<h1>This will become the home screen</h1>')
})

app.get('/main/gametimes', (req, res) => {
  res.send('<h1>This will become the gametime screen</h1>')
})

app.get('/main/players', (req, res) => {
  res.send('<h1>This will become the random players screen</h1>')
})

app.get('/main/matches', (req, res) => {
  res.send(`<h1>This will become a detail page for ${req.params.slug}</h1>`)
})

app.use (function (req, res, next) {
  res.status(404).send("Sorry, can't find that!")
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})