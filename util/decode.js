const jwtDecode = require('jwt-decode');


exports.decoded = (token) =>{
   const tokenDecoded =  jwtDecode(token);
    
   return tokenDecoded;
}