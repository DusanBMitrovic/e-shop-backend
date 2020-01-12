import * as express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import { User } from './entity/User';
import { Product } from './entity/Product';
import { ProductType } from './entity/ProductType';
import { Order } from './entity/Order';

// create typeorm connection
createConnection().then(connection => {
  const userRepository = connection.getRepository(User);
  const productRepository = connection.getRepository(Product);
  const productTypeRepository = connection.getRepository(ProductType);
  const orderRepository = connection.getRepository(Order);

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

    const products2 = await productRepository
      .createQueryBuilder('product')
      .select('product.id', 'id')
      .addSelect('product.name', 'name')
      .addSelect('product.image', 'image')
      .addSelect('product.numberOnStock', 'numberOnStock')
      .addSelect('product.price', 'price')
      .addSelect('product.description', 'description')
      .addSelect('productType.name', 'type')
      .leftJoin('product.productType', 'productType')
      .getRawMany();
    res.json(products2);
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

  // ORDER routes
  app.get('/orders', async function(req: Request, res: Response) {
    const orders = await orderRepository.find({ relations: ['products'] });
    res.json(orders);
  });

  app.post('/orderInfo', async function(req: Request, res: Response) {
    const order = await orderRepository.create(req.body);
    const results = await orderRepository.save(order);
    return res.send(results);
  });

  app.post('/orderStaff', async function(req: Request, res: Response) {
    const order = new Order();
    order.customerName = req.body.customerName;
    order.customerAddress = req.body.customerAddress;
    order.phoneNumber = req.body.phoneNumber;
    order.zipCode = req.body.zipCode;
    order.napomena = req.body.napomena;

    order.products = [];

    req.body.products.forEach(async prId => {
      let product: Product = await productRepository.findOne({ id: prId });
      order.products.push(product);
    });

    // let results = await connection.manager.save(order);
    let results;

    // NE TREBA PREKO TIMEOUTA
    setTimeout(async () => {
      results = await connection.manager.save(order);
      return res.send(results);
    }, 1000);

    // return res.send(results);
  });

  // start express server
  app.listen(3000);
});
