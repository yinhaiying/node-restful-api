const express = require('express');
const router = express.Router();





// $router GET /api/users/test
// @desc 返回请求的json数据
// @access public/private 是公开的接口还是私有的接口，类似token这种肯定是私有的

router.get('/test',(req,res) => {
  res.json({success:'user works'})
});


module.exports = router;
