"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Product_1 = require("./Product");
var Order_1 = require("./Order");
var ProductToOrder = /** @class */ (function () {
    function ProductToOrder() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], ProductToOrder.prototype, "productToOrderId", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], ProductToOrder.prototype, "orderId", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], ProductToOrder.prototype, "productId", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], ProductToOrder.prototype, "numberToOrder", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Product_1.Product; }, function (product) { return product.productToOrder; }),
        __metadata("design:type", Product_1.Product)
    ], ProductToOrder.prototype, "product", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return Order_1.Order; }, function (order) { return order.productToOrder; }),
        __metadata("design:type", Order_1.Order)
    ], ProductToOrder.prototype, "order", void 0);
    ProductToOrder = __decorate([
        typeorm_1.Entity()
    ], ProductToOrder);
    return ProductToOrder;
}());
exports.ProductToOrder = ProductToOrder;
