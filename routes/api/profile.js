const express = require('express');
const router = express.Router();
const passport = require('passport');
const Profile = require('../../models/User');





const validatorRegisterInput = require('../../validation/register');
const validatorLoginInput = require('../../validation/login');

// $router GET /api/users/test
// @desc 返回请求的json数据
// @access public/private 是公开的接口还是私有的接口，类似token这种肯定是私有的

router.get('/test',(req,res) => {
  res.json({success:'profile works'})
});

// $router GET /api/profile
// @desc 查找登陆用户的信息
// @access private


router.get("/",passport.authenticate('jwt', { session: false }),(req,res) => {
  const errors = {};
  Profile.findOne({user: req.user.id})
    .populate('user',["name","avatart"])
    .then((profile) => {
      if(!profile){
        errors.noprofile = "该用户的信息不存在~!";
        return res.status(404).json(errors);
      }

      res.json(profile);
    }).catch(err => res.status(404).json(err));
})



module.exports = router;
