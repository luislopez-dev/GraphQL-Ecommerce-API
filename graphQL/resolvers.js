const User = require('../models/User');
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

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
    const token = jwt.sign({userId: createdUser._id.toString()}, 'secret', {expiresIn: '24h'});    
    return { ...createdUser._doc, _id: createdUser._id.toString(), token };
  },

  login: async function({ email, password }) {

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
    const token = jwt.sign({userId: user._id.toString()}, 'secret', {expiresIn: '24h'});
    return { token: token };
  },

  createProduct: async function({productInput}, req){

    if(!req.isAuth){

      const error = new Error('Not authenticated');

      error.code = 401;

      throw error;
    }
    if(validator.isEmpty(productInput.name) || 
        validator.isEmpty(productInput.price) ||
        validator.isEmpty(productInput.description) ||
        validator.isEmpty(productInput.ammount) ||
        validator.isEmpty(productInput.imgURL)
      ){
      const error = new Error('Required fields empty');
      error.code = 422;
      throw error;
    }
    const product = new Product({
      name:  productInput.name,
      price: productInput.price,
      description: productInput.description,
      ammount: productInput.ammount,
      imgURL: productInput.imgURL
    });

    const createdProduct =  await product.save();

    return {
      ...createdProduct._doc,
      _id: createdProduct._id.toString(),
      createdAt: createdProduct.createdAt.toISOString(),
      updatedAt: createdProduct.updatedAt.toISOString()
    };;
  },

  updateProduct: async function({productInput}, req){

    if(!req.isAuth){

      const err = new Error('Not authenticated');

      err.code = 401;

      throw err;
    }

    if(validator.isEmpty(productInput.name) || 
     validator.isEmpty(productInput.price) ||
     validator.isEmpty(productInput.description) ||
     validator.isEmpty(productInput.ammount) ||
     validator.isEmpty(productInput.imgURL)
    ){
     const error = new Error('Required fields empty');
     error.code = 422;
     throw error;
    }

    const product = await Product.findById(productInput.id);

    product.name = productInput.name;
    product.price = productInput.price;
    product.description = productInput.description;
    product.ammount = productInput.ammount;
    product.imgURL = productInput.imgURL;

    const updatedProduct = await product.save();

    return {
      ...updatedProduct._doc,
      _id: updatedProduct._id.toString(),
      createdAt: updatedProduct.createdAt.toISOString(),
      updatedAt: updatedProduct.updatedAt.toISOString()
    };
  },

  deleteProduct: async function({id}, req){

    if(!req.isAuth){

      const err = new Error('Not authenticated');

      err.code = 401;

      throw err;
    }

    if(validator.isEmpty(productInput.name)){
      const error = new Error('Required fields empty');
     error.code = 422;
     throw error;
    }

    await Product.findByIdAndRemove(id);

    return true;
  },

  products: async function({offset, limit}){

    if(!req.isAuth){

      const err = new Error('Not authenticated');

      err.code = 401;

      throw err;
    }

    if(validator.isEmpty(offset) || validator.isEmpty(limit)){
     const error = new Error('Required fields empty');
     error.code = 422;
     throw error;
    }
    const products = await Product.find().skip(offset).limit(limit);

    return {products: products};
  },

  product: async function({id}){

    if(!req.isAuth){

      const err = new Error('Not authenticated');

      err.code = 401;

      throw err;
    }

    if(validator.isEmpty(id)){
      const error = new Error('Required fields empty');
      error.code = 422;
      throw error;
     }
    const product = await Product.findById(id);
    return product;
  }
}