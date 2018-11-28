const express = require('express');

const app = express();

//连接数据库
const mongoose = require('mongoose');
const {mongoURI } = require('./config/keys');
mongoose.connect(mongoURI)
  .then(() => {
    console.log('连接成功')
  });

//引入user
const user = require('./routes/api/users.js');


//body-parser 中间件
const bodyParser = require('body-parser');
//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


app.get('/',(req,res) => {
  res.json({success:'server works'})
});

app.use('/api/user',user);




const port = process.env.PORT||5000;
app.listen(port,() => {
  console.log( `server is running at http://localhost:${port}`);
});


