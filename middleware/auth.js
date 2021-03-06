require('dotenv').config();

const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

let verifyToken = (req, res, next) => {

  const authHeader = req.get('Authorization');

  if(!authHeader){
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(' ')[1];

  let decoedtoken;

  try {

    decoedtoken = jwt.verify(token, SECRET_KEY); 

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