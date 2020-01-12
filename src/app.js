"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var typeorm_1 = require("typeorm");
var User_1 = require("./entity/User");
var Product_1 = require("./entity/Product");
var ProductType_1 = require("./entity/ProductType");
var Order_1 = require("./entity/Order");
// create typeorm connection
typeorm_1.createConnection().then(function (connection) {
    var userRepository = connection.getRepository(User_1.User);
    var productRepository = connection.getRepository(Product_1.Product);
    var productTypeRepository = connection.getRepository(ProductType_1.ProductType);
    var orderRepository = connection.getRepository(Order_1.Order);
    // create and setup express app
    var app = express();
    app.use(bodyParser.json());
    // register routes
    app.get('/users', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.find()];
                    case 1:
                        users = _a.sent();
                        res.json(users);
                        return [2 /*return*/];
                }
            });
        });
    });
    app.get('/users/:id', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.findOne(req.params.id)];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        });
    });
    app.post('/users', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.create(req.body)];
                    case 1:
                        user = _a.sent();
                        return [4 /*yield*/, userRepository.save(user)];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        });
    });
    app.put('/users/:id', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.findOne(req.params.id)];
                    case 1:
                        user = _a.sent();
                        userRepository.merge(user, req.body);
                        return [4 /*yield*/, userRepository.save(user)];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        });
    });
    app.delete('/users/:id', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, userRepository.delete(req.params.id)];
                    case 1:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        });
    });
    // PRODUCT routes
    app.get('/products', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var products, products2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productRepository.find()];
                    case 1:
                        products = _a.sent();
                        return [4 /*yield*/, productRepository
                                .createQueryBuilder('product')
                                .select('product.id', 'id')
                                .addSelect('product.name', 'name')
                                .addSelect('product.image', 'image')
                                .addSelect('product.numberOnStock', 'numberOnStock')
                                .addSelect('product.price', 'price')
                                .addSelect('product.description', 'description')
                                .addSelect('productType.name', 'type')
                                .leftJoin('product.productType', 'productType')
                                .getRawMany()];
                    case 2:
                        products2 = _a.sent();
                        res.json(products2);
                        return [2 /*return*/];
                }
            });
        });
    });
    app.post('/products', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var product, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productRepository.create(req.body)];
                    case 1:
                        product = _a.sent();
                        return [4 /*yield*/, productRepository.save(product)];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        });
    });
    //   PRODUCTTYPE routes
    app.get('/productTypes', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var productTypes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productTypeRepository.find()];
                    case 1:
                        productTypes = _a.sent();
                        res.json(productTypes);
                        return [2 /*return*/];
                }
            });
        });
    });
    app.post('/productTypes', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var productType, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, productTypeRepository.create(req.body)];
                    case 1:
                        productType = _a.sent();
                        return [4 /*yield*/, productTypeRepository.save(productType)];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        });
    });
    // ORDER routes
    app.get('/orders', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderRepository.find({ relations: ['products'] })];
                    case 1:
                        orders = _a.sent();
                        res.json(orders);
                        return [2 /*return*/];
                }
            });
        });
    });
    app.post('/orderInfo', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var order, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, orderRepository.create(req.body)];
                    case 1:
                        order = _a.sent();
                        return [4 /*yield*/, orderRepository.save(order)];
                    case 2:
                        results = _a.sent();
                        return [2 /*return*/, res.send(results)];
                }
            });
        });
    });
    app.post('/orderStaff', function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var order, results;
            var _this = this;
            return __generator(this, function (_a) {
                console.log('#### REQ ', req);
                order = new Order_1.Order();
                order.customerName = req.body.customerName;
                order.customerAddress = req.body.customerAddress;
                order.phoneNumber = req.body.phoneNumber;
                order.zipCode = req.body.zipCode;
                order.napomena = req.body.napomena;
                order.products = [];
                req.body.products.forEach(function (prId) { return __awaiter(_this, void 0, void 0, function () {
                    var product;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, productRepository.findOne({ id: prId })];
                            case 1:
                                product = _a.sent();
                                order.products.push(product);
                                return [2 /*return*/];
                        }
                    });
                }); });
                // NE TREBA PREKO TIMEOUTA
                setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, connection.manager.save(order)];
                            case 1:
                                results = _a.sent();
                                return [2 /*return*/, res.send(results)];
                        }
                    });
                }); }, 1000);
                return [2 /*return*/];
            });
        });
    });
    // start express server
    app.listen(3000);
});
