const JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
const {secretOrKey} = require('./keys');
//得到token
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//设置token时使用的加密名字
opts.secretOrKey = secretOrKey;


const User = require('../models/User');


module.exports = function(passport){
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    // console.log(jwt_payload);
    User.findById(jwt_payload.id)
      .then((user) => {
        if(user){
          return done(null,user)
        }else{
          return done(null,false);
        }
      })
  }));
};
