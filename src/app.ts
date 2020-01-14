import * as express from 'express';
import { Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import { User } from './entity/User';
import { Product } from './entity/Product';
import { ProductType } from './entity/ProductType';
import { Order } from './entity/Order';
import { ProductToOrder } from './entity/ProductToOrder';

// create typeorm connection
createConnection().then(connection => {
  const userRepository = connection.getRepository(User);
  const productRepository = connection.getRepository(Product);
  const productTypeRepository = connection.getRepository(ProductType);
  const orderRepository = connection.getRepository(Order);
  const produtctToOrderRepository = connection.getRepository(ProductToOrder);

  // create and setup express app
  const app = express();
  app.use(bodyParser.json());

  app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
  });

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
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost');
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
    const orders = await orderRepository.find({
      relations: ['productToOrder']
    });
    res.json(orders);
  });

  app.get('/orders2', async function(req: Request, res: Response) {
    // const orders = await orderRepository.find({
    //   relations: ['productToOrder']
    // });
    const orders = await produtctToOrderRepository
      .createQueryBuilder('productToOrder')
      // .select('productToOrder.productToOrderId', 'id')
      .select('order.id', 'id')
      .addSelect('order.datetime', 'datetime')
      .addSelect('order.customerName', 'customerName')
      .addSelect('order.phoneNumber', 'phoneNumber')
      .addSelect('order.customerAddress', 'customerAddress')
      .addSelect('order.zipCode', 'zipCode')
      .addSelect('order.napomena', 'napomena')
      .addSelect('product.name', 'productName')
      .addSelect('product.price', 'productPrice')
      .addSelect('productToOrder.numberToOrder', 'numberToOrder')
      .leftJoin('productToOrder.order', 'order')
      .leftJoin('productToOrder.product', 'product')
      .getRawMany();

    res.json(orders);
  });

  app.post('/orderInfo', async function(req: Request, res: Response) {
    console.log('########## ', req.body);

    const order = await orderRepository.create(req.body);
    const results = await orderRepository.save(order);
    return res.send(results);
  });

  app.post('/orderStaff', async function(req: Request, res: Response) {
    // const order = new Order();
    // order.customerName = req.body.customerName;
    // order.customerAddress = req.body.customerAddress;
    // order.phoneNumber = req.body.phoneNumber;
    // order.zipCode = req.body.zipCode;
    // order.napomena = req.body.napomena;
    // order.products = [];
    // req.body.products.forEach(async prId => {
    //   let product: Product = await productRepository.findOne({ id: prId });
    //   order.products.push(product);
    // });
    // // let results = await connection.manager.save(order);
    // let results;
    // // NE TREBA PREKO TIMEOUTA
    // setTimeout(async () => {
    //   results = await connection.manager.save(order);
    //   return res.send(results);
    // }, 1000);
    // return res.send(results);
  });

  app.post('/productToOrder', async function(req: Request, res: Response) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-type', 'application/json');
    const productToOrder = await produtctToOrderRepository.create(req.body);
    const results = await produtctToOrderRepository.save(productToOrder);
    return res.send(results);
  });

  // start express server
  app.listen(3000);
});
