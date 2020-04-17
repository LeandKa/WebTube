const User = require('../models').User;
const bcrpty = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {

    async login(req,res) {
       const {username,password} = req.body;
       if(username && password == null ){
          return res.status(404).json({
              message:'Por favor informe username e password'
          })
       } else{
        const user = await User.findOne({where:{username:username}})
        if(user){
            bcrpty.compare(user.password,password)
            .then(resultBcrpy =>{
                const payload = {id:user.id};
                const signedToken = jwt.sign(payload,process.env.SECRET,{expiresIn:'1d'})
                return res.status(200).json({token: "Bearer " + signedToken,userId:user.id})
            })
            .catch(err =>{
                console.log('Nao foi')
            })
        }  
       } 
       return res.status(404).status('Nenhum usuario com esse username foi achado')

    }

}