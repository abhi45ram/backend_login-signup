const express = require('express');
const app = express();
const mongoose = require('mongoose');
var routes = require('./route/routes');
mongoose.set('strictQuery', false);
const cors = require('cors');
app.use(cors(
  {
    origin: "http://localhost:4200"
  }
));

app.listen(9992, function check(err) {
  if (err) console.log("error");
  else console.log("started");
});

mongoose.connect("mongodb://localhost:27017/Quantum")
  .then(() => {
    console.log("Successfully connected to DB");
  })
  .catch(error => {
    console.error("Error connecting to DB", error);
  });
   
  app.use(express.json());
  app.use(routes);