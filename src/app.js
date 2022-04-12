import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema  } from 'graphql';
import products from './products.js';

const app = express();
const server = app.listen(8080, () => console.log('Listening'));

let counter = 1;

let schema = buildSchema(`
  type Product {
    id: Int
    title: String
    price: Int
  }
  type Query {
    products: [Product]
  }
  type Mutation {
    addProduct(title: String, price: Int): Product
    getById(id: Int): Product
    deleteProduct(id: Int): Product
  }
`);

const root = {
  products: () => products.getProducts(),
  addProduct: (data) => {
    let product = { 'id': counter, 'title': data.title, 'price': data.price };
    products.addProduct(product);
    counter++;
    return product;
  },
  getById: (data) => products.getById({ 'id': data.id }),
  deleteProduct: (data) => products.deleteProduct({ 'id': data.id }),
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));
