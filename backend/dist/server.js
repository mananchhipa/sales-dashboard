"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const states_js_1 = require("./data/states.js");
const sales_js_1 = __importDefault(require("./data/sales.js"));
const lodash_1 = __importDefault(require("lodash"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const port = process.env.PORT || 4000;
app.get("/", (req, res) => {
    res.send("Hello, Typescript + Nodejs + Express!");
});
app.get("/states", (req, res) => {
    res.status(200).json({ data: states_js_1.states });
});
app.get("/stats", (req, res) => {
    const totalSales = lodash_1.default.sumBy(sales_js_1.default, "sales");
    const totalQuantity = lodash_1.default.sumBy(sales_js_1.default, "quantity");
    const totalDiscountPercentage = lodash_1.default.sumBy(sales_js_1.default, "discount") / 100;
    const totalProfilt = lodash_1.default.sumBy(sales_js_1.default, "profit");
    return res.send({
        totalSales,
        totalQuantity,
        totalDiscountPercentage,
        totalProfilt,
    });
});
app.post("/charts", (req, res) => {
    const { selectedState, startDate, endDate } = req.body;
    let salesData = sales_js_1.default;
    if (selectedState) {
        salesData = lodash_1.default.filter(salesData, (s) => s.state == selectedState);
    }
    if (startDate && endDate) {
        salesData = lodash_1.default.filter(salesData, (s) => s.orderDate >= startDate && s.orderDate <= endDate);
    }
    else if (startDate) {
        salesData = lodash_1.default.filter(salesData, (s) => s.orderDate == startDate);
    }
    else if (endDate) {
        salesData = lodash_1.default.filter(salesData, (s) => s.orderDate == endDate);
    }
    const salesByCity = lodash_1.default.reduce(salesData, (acc, item) => {
        if (acc[item.city]) {
            acc[item.city] += item.sales;
        }
        else {
            acc[item.city] = item.sales;
        }
        return acc;
    }, {});
    const salesByProducts = lodash_1.default.reduce(salesData, (acc, item) => {
        if (acc[item.productName]) {
            acc[item.productName] += item.sales;
        }
        else {
            acc[item.productName] = item.sales;
        }
        return acc;
    }, {});
    const salesByCategory = lodash_1.default.reduce(salesData, (acc, item) => {
        if (acc[item.category]) {
            acc[item.category] += item.sales;
        }
        else {
            acc[item.category] = item.sales;
        }
        return acc;
    }, {});
    const salesBySubCategory = lodash_1.default.reduce(salesData, (acc, item) => {
        if (acc[item.subCategory]) {
            acc[item.subCategory] += item.sales;
        }
        else {
            acc[item.subCategory] = item.sales;
        }
        return acc;
    }, {});
    const salesBySegment = lodash_1.default.reduce(salesData, (acc, item) => {
        if (acc[item.segment]) {
            acc[item.segment] += item.sales;
        }
        else {
            acc[item.segment] = item.sales;
        }
        return acc;
    }, {});
    return res.send({
        salesByCity,
        salesByProducts,
        salesByCategory,
        salesBySubCategory,
        salesBySegment,
    });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
