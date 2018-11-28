const validator = require('validator');

const isEmpty = require('./is_empty');

module.exports = function validatorRegisterInput(data){
  const errors = {};

  //如果没有添加这个字段，那么会接收到undefined不是String类型
  data.name = !isEmpty(data.name) ? data.name : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.password2 = !isEmpty(data.password2) ? data.password2 : '';
  //验证name长度
  if(!validator.isLength(data.name,{min:2, max: 30})){
    errors.name = {name:'用户名长度必须是大于2位小于30位'}
  }
  //验证输入不能为空
  if(validator.isEmpty(data.name)){
    errors.name = {name:'用户名不能为空'}
  }
  //验证邮箱不能为空
  if(validator.isEmpty(data.email)){
    errors.email = {email:'邮箱不能为空'}
  }
  //验证邮箱是否合法
  if(!validator.isEmail(data.email)){
    errors.email = {email:'请输入合法的邮箱'}
  }

  if(validator.isEmpty(data.password)){
    errors.password = "密码不能为空!";
  }

  if(!validator.isLength(data.password,{min:6,max:30})){
    errors.password = "密码的长度不能小于6位并且不能大于30位!";
  }

  if(validator.isEmpty(data.password2)){
    errors.password2 = "确认密码不能为空!";
  }

  if(!validator.equals(data.password,data.password2)){
    errors.password2 = "两次不一致!";
  }
  return {
    errors,
    isValid:isEmpty(errors)
  }
};
