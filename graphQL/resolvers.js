require('dotenv').config();

const User = require('../models/User');
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {

  createUser: async function({ userInput }, req) {

    const errors = [];
    if (validator.isEmpty(userInput.email) || 
        validator.isEmpty(userInput.password) || 
        validator.isEmpty(userInput.name) ){
      errors.push({ message: 'Required fields empty' });
    }
    if (!validator.isEmail(userInput.email)) {
      errors.push({ message: 'E-Mail is invalid.' });
    }
    if (errors.length > 0) {
      const error = new Error('Invalid input.');
      error.data = errors;
      error.code = 422;
      throw error;
    }
    const existingUser = await User.findOne({ email: userInput.email });
    if (existingUser) {
      const error = new Error('User exists already!');
      error.code = 422;
      throw error;
    }
    const hashedPw = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: userInput.email,
      password: hashedPw,
      name: userInput.name
    });
    const createdUser = await user.save();
    const token = jwt.sign({userId: createdUser._id.toString()}, SECRET_KEY, {algorithm: "HS256", expiresIn: '24h'});    
    return { ...createdUser._doc, _id: createdUser._id.toString(), token };
  },

  login: async function({ email, password }, req) {

    if (validator.isEmpty(email) || validator.isEmpty(password)) {
      const error = new Error('Required fields empty');
      error.code = 422;
      throw error;
    }
    const user = await User.findOne({email:email});
    if (!user) {
      const error = new Error('User not found');
      error.code = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('Password is incorrect.');
      error.code = 401;
      throw error;
    }
    const token = jwt.sign({userId: user._id.toString()}, SECRET_KEY, {algorithm: "HS256", expiresIn: '24h'});
    return { token: token };
  },

  createProduct: async function({productInput}, req){

    if(!req.isAuth){

      const error = new Error('Not authenticated');

      error.code = 401;

      throw error;
    }
    
    const product = new Product({
      name:  productInput.name,
      price: productInput.price,
      brand: productInput.brand,
      manufacturer: productInput.manufacturer,
      description: productInput.description,
      ammount: productInput.ammount,
      imgURL: productInput.imgURL
    });

    console.log(productInput);

    const createdProduct =  await product.save();

    return true;
  },

  updateProduct: async function({productInput}, req){

    if(!req.isAuth){
      const err = new Error('Not authenticated');
      err.code = 401;
      throw err;
    }

    const product = await Product.findById(productInput._id);
    product.name = productInput.name;
    product.brand = productInput.brand;
    product.manufacturer = productInput.manufacturer;
    product.price = productInput.price;
    product.description = productInput.description;
    product.ammount = productInput.ammount;
    product.imgURL = productInput.imgURL;

    const updatedProduct = await product.save();

    return true;
  },

  deleteProduct: async function({_id}, req){

    if(!req.isAuth){

      const err = new Error('Not authenticated');

      err.code = 401;

      throw err;
    }
    await Product.findByIdAndRemove(_id);

    return true;
  },

  products: async function({offset, limit}, req){

    const products = await Product.find().skip(offset).limit(limit);

    return {products: products};
  },

  product: async function({_id}, req){

    if(validator.isEmpty(_id)){
      const error = new Error('Required fields empty');
      error.code = 422;
      throw error;
     }
    const product = await Product.findById(_id);
    return product;
  },

  search: async function({name, offset, limit}, req){

    let products;

    try {
  
      products = await Product.find({name: {$regex: name, $options:'i'}})
      .skip(offset).limit(limit);
        
    } catch (error) {
      const err = new Error(error.message);
      err.code = 500;
      throw err;
    }
  
    return products;    
  },

}