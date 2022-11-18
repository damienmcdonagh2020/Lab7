const express = require('express')
const app = express()
const port = 4000
var bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const cors = require('cors');
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// getting-started.js
//Code taking from mongoosew website

const mongoose = require('mongoose');

main().catch(err => console.log(err));
//Reading in the mongodb with Damo as username(my name) and admin as password
async function main() {
  await mongoose.connect('mongodb+srv://Damo:admin@damodatabase.cefelej.mongodb.net/?retryWrites=true&w=majority');
  
  // use `await mongoose.connect('mongodb://user:password@localhost:27017/test');` if your database has auth enabled
}
//data model schema  reading title cover author as strings
const bookSchema = new mongoose.Schema({
  title: String,
  cover: String,
  author: String
});

const bookModel = mongoose.model('ReadBooks', bookSchema);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/books',(req,res)=>{
  console.log(req.body);
  //Post the schemas 
  bookModel.create({
    title: req.body.title,
    cover: req.body.cover,
    author: req.body.author
  })
  res.send('Data Recieved');
})
//Find Id books
app.get('/api/books', (req, res) => {
 bookModel.find((error, data) => {
  res.json(data);
 })
})
//Get data searching the unique ID return data
app.get('/api/book/:id', (req,res)=>{
  console.log(req.params.id)
  bookModel.findById(req.params.id,(error,data)=>{
    res.json(data);
  })
  res.send('data');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})