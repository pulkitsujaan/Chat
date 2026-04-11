const express = require("express");
const dbconnect = require('./config/db');

const app = express();

app.listen(3000, ()=>{
  console.log("Server started on PORT 3000");
  dbconnect();
})