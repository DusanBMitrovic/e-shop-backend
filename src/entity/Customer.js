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
var Order_1 = require("./Order");
var Customer = /** @class */ (function () {
    function Customer() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Customer.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customer.prototype, "customerName", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customer.prototype, "customerAddress", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customer.prototype, "zipCode", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Customer.prototype, "phoneNumber", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return Order_1.Order; }, function (order) { return order.customer; }),
        __metadata("design:type", Array)
    ], Customer.prototype, "orders", void 0);
    Customer = __decorate([
        typeorm_1.Entity()
    ], Customer);
    return Customer;
}());
exports.Customer = Customer;
