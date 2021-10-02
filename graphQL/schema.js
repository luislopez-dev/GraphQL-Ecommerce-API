const { buildSchema } = require('graphql');

module.exports = buildSchema(`

  type Product {
      _id: ID!
      name: String!     
      price: Float!
      description: String!
      ammount: Int!
      imgURL: String!      
  }

  type User {
      id: ID!
      token: String!
      
  }

  input UserInputData {
      email: String!
      password: String!
      name: String!
  }

  input NewProductInputData {
      name: String!
      price: Float!
      description: String!
      ammount: Int!
      imgURL: String!
  }

  type ProductsData{
      products: [Product]!
  }

  input UpdateProductInputData {
    id: String!
    name: String!
    price: Float!
    description: String!
    ammount: Int!
    imgURL: String!
  }

  type AuthData {
      token: String!
  }

  type RootMutation {
      createUser(userInput: UserInputData): User!
      createProduct(productInput: NewProductInputData): Boolean!
      updateProduct(productInput: UpdateProductInputData): Boolean!
      deleteProduct(id: String!): Boolean!
  }

  type RootQuery {
      login(email: String!, password: String!): AuthData!
      products(offset: Int!, limit:Int!): ProductsData!
      product(id: ID!): Product!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);