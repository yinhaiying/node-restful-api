const express = require('express');

const app = express();
const mongoose = require('mongoose');
const {mongoURI } = require('./config/keys');
mongoose.connect(mongoURI)
  .then(() => {
    console.log('连接成功')
  });


app.get('/',(req,res) => {
  res.json({success:'server works'})
});


const port = process.env.PORT||5000;
app.listen(port,() => {
  console.log( `server is running at http://localhost:${port}`);
});


