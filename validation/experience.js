const validator = require('validator');

const isEmpty = require('./is_empty');

module.exports = function validatorExperienceInput(data){
  let errors = {};

  data.title = !isEmpty(data.title)?data.title:'';
  data.company = !isEmpty(data.company)?data.company:'';
  data.from = !isEmpty(data.from)?data.from:'';






  if(validator.isEmpty(data.title)){
    errors.title = 'title不能为空';
  }



  if(validator.isEmpty(data.company)){
    errors.company = 'company不能为空';
  }

  if(validator.isEmpty(data.from)){
    errors.from = 'from不能为空';
  }




  return {
    errors,
    isValid:isEmpty(errors)
  }
};
