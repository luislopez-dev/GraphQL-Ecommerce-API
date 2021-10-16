const { buildSchema } = require('graphql');

module.exports = buildSchema(`

  type Product {
      _id: ID!
      name: String!    
      brand: String!
      manufacturer: String! 
      price: Float!
      description: String!
      ammount: Int!
      imgURL: String!      
  }

  type User {
      _id: ID!
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
      brand: String!
      manufacturer: String!
      description: String!
      ammount: Int!
      imgURL: String!
  }

  type ProductsData{
      products: [Product]!
  }

  input UpdateProductInputData {
    _id: String!
    name: String!
    brand: String!
    manufacturer: String!
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
      deleteProduct(_id: String!): Boolean!
  }

  type RootQuery {
      login(email: String!, password: String!): AuthData!
      products(offset: Int!, limit:Int!): ProductsData!
      product(_id: ID!): Product!
      search(offset: Number!, limit: !Int, name: String): ProductsData!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`);