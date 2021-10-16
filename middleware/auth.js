const jwt = require("jsonwebtoken");

let verifyToken = (req, res, next) => {

  const authHeader = req.get('Authorization');

  if(!authHeader){
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(' ')[1];

  let decoedtoken;

  try {

    decoedtoken = jwt.verify(token, 'secret'); 

  } catch (error) {

    req.isAuth = false;
    
    return next();
  }

  if(!decoedtoken){

    req.isAuth = false;

    return next();
  }

  req.isAuth = true;

  next();
}

module.exports = { verifyToken };