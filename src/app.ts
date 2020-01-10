import * as express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import { User } from './entity/User';
import { Product } from './entity/Product';
import { ProductType } from './entity/ProductType';

// create typeorm connection
createConnection().then(connection => {
  const userRepository = connection.getRepository(User);
  const productRepository = connection.getRepository(Product);
  const productTypeRepository = connection.getRepository(ProductType);

  // create and setup express app
  const app = express();
  app.use(bodyParser.json());

  // register routes

  app.get('/users', async function(req: Request, res: Response) {
    const users = await userRepository.find();
    res.json(users);
  });

  app.get('/users/:id', async function(req: Request, res: Response) {
    const results = await userRepository.findOne(req.params.id);
    return res.send(results);
  });

  app.post('/users', async function(req: Request, res: Response) {
    const user = await userRepository.create(req.body);
    const results = await userRepository.save(user);
    return res.send(results);
  });

  app.put('/users/:id', async function(req: Request, res: Response) {
    const user = await userRepository.findOne(req.params.id);
    userRepository.merge(user, req.body);
    const results = await userRepository.save(user);
    return res.send(results);
  });

  app.delete('/users/:id', async function(req: Request, res: Response) {
    const results = await userRepository.delete(req.params.id);
    return res.send(results);
  });

  // PRODUCT routes
  app.get('/products', async function(req: Request, res: Response) {
    const products = await productRepository.find();
    res.json(products);
  });

  app.post('/products', async function(req: Request, res: Response) {
    const product = await productRepository.create(req.body);
    const results = await productRepository.save(product);
    return res.send(results);
  });

  //   PRODUCTTYPE routes
  app.get('/productTypes', async function(req: Request, res: Response) {
    const productTypes = await productTypeRepository.find();
    res.json(productTypes);
  });

  app.post('/productTypes', async function(req: Request, res: Response) {
    const productType = await productTypeRepository.create(req.body);
    const results = await productTypeRepository.save(productType);
    return res.send(results);
  });

  // start express server
  app.listen(3000);
});
