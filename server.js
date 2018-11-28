const express = require('express');

const app = express();


app.get('/',(req,res) => {
  res.json({success:'server works'})
});


const port = process.env.PORT||5000;
app.listen(port,() => {
  console.log( `server is running at http://localhost:${port}`);
});


