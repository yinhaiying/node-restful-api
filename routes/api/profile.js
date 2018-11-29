const express = require('express');
const router = express.Router();
const passport = require('passport');
const Profile = require('../../models/Profile');
const _ = require('lodash');
const validatorProfileInput = require('../../validation/profile')
const validatorExperienceInput = require('../../validation/experience');




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
});

// $router POST /api/profile
// @desc编辑个人用户信息
// @access private
router.post('/',passport.authenticate('jwt', { session: false }),(req,res) => {

  const {errors,isValid} = validatorProfileInput(req.body);

  if(!isValid){
    return res.status(400).json(errors);
  }


  const profileField = {};
  profileField.user = req.user.id;
  if(req.body.handle){
   profileField.handle = req.body.handle;
  }

  if(req.body.company){
   profileField.company = req.body.company;
  }

  if(req.body.website){
   profileField.website = req.body.website;
  }

  if(req.body.location){
   profileField.location = req.body.location;
  }

  if(req.body.status){
   profileField.status = req.body.status;
  }

  // skills  前端传递过来的肯定是一个字符串，因此需要及逆行转换
  if(typeof req.body.skills !=='undefined'){
   profileField.skills = req.body.skills.split(',');
  }

  if(req.body.bio){
   profileField.bio = req.body.bio;
  }
  if(req.body.githubusername){
   profileField.githubusername= req.body.githubusername;
  }


 profileField.social = {};

  if(req.body.wechat){
   profileField.social.wechat = req.body.wechat;
  }
  if(req.body.QQ){
   profileField.social.QQ = req.body.QQ;
  }
  if(req.body.tengxunkt){
   profileField.social.tengxunkt = req.body.tengxunkt;
  }
  if(req.body.wangyikt){
   profileField.social.wangyikt = req.body.wangyikt;
  }

  Profile.findOne({user:req.user.id})
    .then((profile) => {
      if(profile){
      //  如果存在，说明进行修改操作
        Profile.findOneAndUpdate({user:req.user.id},{$set:profileField},{new:true})
          .then((profile) => res.json(profile))
      }else{
        new Profile(profileField)
          .save()
          .then((profile) => res.json(profile));
      }
    });
});




// $router POST /api/profile
// @desc添加个人经历的接口
// @access private

router.post('/experience',passport.authenticate('jwt', { session: false }),(req,res) => {
  const newExp = {};
  if(req.body.title){
    newExp.title = req.body.title;
  }
  if(req.body.company){
    newExp.company = req.body.company;
  }
  if(req.body.location){
    newExp.location = req.body.location;
  }
  if(req.body.from){
    newExp.from= req.body.from;
  }
  if(req.body.to){
    newExp.to = req.body.to;
  }
  if(req.body.description){
    newExp.description = req.body.description;
  }
  Profile.findOne({user:req.user.id})
    .then((profile) => {
      profile.experience.push(newExp);
      profile.save().then(profile => res.json(profile))
    })
    .catch(() => res.json({'error':'noprofile'}))
});

// $router POST /api/profile/experience
// @desc删除个人经历的接口
// @access private

router.delete('/experience/:id',passport.authenticate('jwt', { session: false }),(req,res) => {
  Profile.findOne({user:req.user.id})
    .then((profile) => {
      const removeIndex =  _.findIndex('profile.experience',(o) => {return o._id === req.params.id});
      profile.experience.splice(removeIndex,1);
      profile.save().then(() => res.json({success:true}))
    })
})



module.exports = router;
