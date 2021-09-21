require('dotenv').config()

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const MONGO_URL = process.env.MONGO_URL;
const auth = require('./middleware/auth').verifyToken;
const { graphqlHTTP } = require('express-graphql');
const graphqlSchema = require('./graphQL/schema');
const graphqlResolver = require('./graphQL/resolvers');

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(auth);

app.use('/graphql', graphqlHTTP({
  schema: graphqlSchema,
  rootValue: graphqlResolver,
  graphiql: true
}))

mongoose.set('useFindAndModify', false);
mongoose.connect(MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
 .then( res => {
   app.listen('8080');
   console.log('Server running ...');
  })
 .catch(e => {
    console.log(e.message);
  });