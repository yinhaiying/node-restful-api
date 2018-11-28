

//这里就是把各种情况看作empty,包括输入为undefined ,null,数组中长度为0，对象里面内容为0

const isEmpty = function(value){
  //值为undefined或者null 都视作为空
  if(value === undefined || value === null){
    return true;
  }

  //字符串去除空格以后长度为0 视为空
  if(typeof value === 'string' && value.trim().length === 0){
    return true;
  }

  //非null 的对象内部没有属性，认定为空
  if(typeof value === 'object' && value!==null && Object.keys(value).length ===0){
    return true
  }
  //数组为空时认定为空
  if(Array.isArray(value) && value.length === 0){
    return true
  }
  return false;
};
module.exports = isEmpty;



