const User = require('../models/User');
const Product = require('../models/Product');
const jwt = require('jsonwebtoken');

module.exports = {

  createUser: async function({ userInput }, req) {

        //   const email = args.userInput.email;
        const existingUser = await User.findOne({ email: userInput.email });
        if (existingUser) {
          const error = new Error('User exists already!');
          throw error;
        }
        const hashedPw = userInput.password;
        const user = new User({
          email: userInput.email,
          password: hashedPw
        });
        const createdUser = await user.save();
        return { ...createdUser._doc, _id: createdUser._id.toString() };
  },

  login: async function({ email, password }) {

    const user = await User.findOne({email:email, password:password});

    if (!user) {
      const error = new Error('Incorrect user or password');
      error.code = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: user.email
      },
      'secret',
      { expiresIn: '1h' }
    );
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
      description: productInput.description,
      ammount: productInput.ammount,
      imgURL: productInput.imgURL
    });

    const createdProduct =  await product.save();

    console.log(createdProduct);

    return true;

  },

  updateProduct: async function({productInput}, req){

    if(!req.isAuth){

      const err = new Error('Not authenticated');

      err.code = 401;

      throw err;
    }

    const product = await Product.findById(productInput.id);

    product.name = productInput.name;
    product.price = productInput.price;
    product.description = productInput.description;
    product.ammount = productInput.ammount;
    product.imgURL = productInput.imgURL;

    await product.save();

    return true;
  },

  deleteProduct: async function({id}, req){

    if(!req.isAuth){

      const err = new Error('Not authenticated');

      err.code = 401;

      throw err;
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
  
    const products = await Product.find().skip(offset).limit(limit);

    return {products: products};
  },

  product: async function({id}){

    if(!req.isAuth){

      const err = new Error('Not authenticated');

      err.code = 401;

      throw err;
    }

    const product = await Product.findById(id);

    return product;

  }

}