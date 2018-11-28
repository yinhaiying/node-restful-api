const express = require('express');
const router = express.Router();

const User = require('../../models/User');

const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const {secretOrKey} = require('../../config/keys');



const validatorRegisterInput = require('../../validation/register');

// $router GET /api/users/test
// @desc 返回请求的json数据
// @access public/private 是公开的接口还是私有的接口，类似token这种肯定是私有的

router.get('/test',(req,res) => {
  res.json({success:'user works'})
});


// $router POST /api/users/register
// @desc 返回请求的json数据
// @access public

router.post('/register',(req,res) => {

  const { errors,isValid} = validatorRegisterInput(req.body);
  if(!isValid){
    return res.status(400).json(errors)
  }

  User.findOne({email:req.body.email})
    .then((user) => {
      if(user){
        //邮箱存在则返回错误信息
        return res.status(403).json({'error':'邮箱已被注册'});
      }else{
        //邮箱不存在，创建用户
        const avatar = gravatar.url('18840842571@163.com', {s: '200', r: 'pg', d: 'mm'});
        const newUser = new User({
          name:req.body.name,
          email:req.body.email,
          password:req.body.password,
          avatar
        });

        // 进行加密
        bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(newUser.password, salt, function(err, hash) {
            if(err){
              throw err
            }else{
              newUser.password = hash;
              newUser.save()
                .then((user) => {
                  res.json(user)
                })
            }

          });
        });
      }
    })
});


// $router POST /api/users/login
// @desc 返回token
// @access public

router.post('/login',(req,res) => {
  const email = req.body.email;
  const password = req.body.password;
//  查询email是否存在
  User.findOne({email:email})
    .then((user) => {
      if(!user){
        return res.status(404).json({error:'邮箱不存在'});
      }else{
      //  验证密码
        bcrypt.compare(password,user.password, function(err,isMatch) {
          if(!isMatch){
            res.json({error:'密码错误'})
          }else{
            //登陆成功之后，应该返回一个token
            const rule = {name:user.name,id:user.id};
            jwt.sign(rule,secretOrKey,{expiresIn:3600},(err,token) => {
              if(err){
                throw err
              }else{
                res.json({
                  success:true,
                  token:"Bearer "+token})
              }
            })

          }
        });
      }
    })
});

// $router GET /api/users/current
// @desc return current user
// @access private

router.get('/current',passport.authenticate('jwt',{ session: false }),(req,res) => {
  res.json({
    id:req.user.id,
    name:req.user.name,
    email:req.user.email,
    avatar:req.user.avatar
  })
});


module.exports = router;
