require('dotenv').config()

const PORT = process.env.PORT;
const SET_GRAPHIQL = (process.env.SET_GRAPHIQL == "true");
const MONGO_URL = process.env.MONGO_URL;
const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./middleware/auth').verifyToken;
const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('./graphQL/schema');
const graphqlResolver = require('./graphQL/resolvers');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'});

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(auth);
app.use(morgan('combined', { stream:accessLogStream }));

app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolver,
  graphiql: SET_GRAPHIQL,
  customFormatErrorFn(err) {
    if (!err.originalError) {
      return err;
    }
    const data = err.originalError.data;
    const message = err.message || 'An error occurred.';
    const code = err.originalError.code || 500;
    return { message: message, status: code, data: data };
  }
}));

mongoose.set('useFindAndModify', false);
mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
 .then( res => {
   app.listen(PORT || 8080);
   console.log('Server running ...');
  })
 .catch(e => {
    console.log(e.message);
  });