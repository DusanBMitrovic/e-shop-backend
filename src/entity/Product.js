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
var ProductType_1 = require("./ProductType");
var ProductToOrder_1 = require("./ProductToOrder");
var Product = /** @class */ (function () {
    function Product() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Product.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Product.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Product.prototype, "image", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Product.prototype, "numberOnStock", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Product.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Product.prototype, "price", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return ProductType_1.ProductType; }, function (productType) { return productType.products; }, {
            cascade: true
        }),
        __metadata("design:type", ProductType_1.ProductType)
    ], Product.prototype, "productType", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return ProductToOrder_1.ProductToOrder; }, function (productToOrder) { return productToOrder.product; }),
        __metadata("design:type", Array)
    ], Product.prototype, "productToOrder", void 0);
    Product = __decorate([
        typeorm_1.Entity()
    ], Product);
    return Product;
}());
exports.Product = Product;
