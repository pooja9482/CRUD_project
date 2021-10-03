const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
var bodyParser = require("body-parser"); 
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mca');
}
const movies_schema = new mongoose.Schema({
  movies_name: String,
  actor: String,
  actress: String,
  year_of_release: Number,
  director: String
});

const Movies = mongoose.model('movies', movies_schema);

app.post('/save-movies', async(req, res) => {
  console.log("gettin this req body to save = ",req.body)
  const movieData = new Movies(req.body);
  await movieData.save();

  res.send(movieData)
})

app.get('/get-movies', async(req, res) => {
  const movieList = await Movies.find();
  res.send({data:movieList})
})

app.post('/find-actor', async(req, res) => {
  const movie = await Movies.find({actor:req.body.actor});
  res.send({data:movie})
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

