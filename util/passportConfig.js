const User = require('../models').User;  
const passportJWT = require('passport-jwt');

const Extractjwt = passportJWT.ExtractJwt;

const jwtStrategy = passportJWT.Strategy;

const jwtOptions = {
jwtFromRequest : Extractjwt.fromAuthHeaderAsBearerToken(),
secretOrKey : 'secret'
};

const strategy = new jwtStrategy(jwtOptions,(pay_load,done)=>{
    const user = getUser(pay_load.id);
    if(user){
       return done(null,user);
    }else{
        return done(null,false);
    }
});

const getUser = async (id) =>{
    const ids = id;

    const usuario = await User.findOne({where:{id:ids}})
    return usuario
}


module.exports = passport =>{

    passport.use(strategy);

};
