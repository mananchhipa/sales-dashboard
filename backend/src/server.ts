import express, { Request, Response } from "express";
import { states } from "./data/states.js";
import { Sale } from "./interfaces";
import sales from './data/sales.js'
import _ from "lodash";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT || 4000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Typescript + Nodejs + Express!");
});

app.get("/states", (req: Request, res: Response) => {
  res.status(200).json({ data: states });
});

app.get("/stats", (req: Request, res: Response) => {
  const totalSales = _.sumBy(sales, "sales");
  const totalQuantity = _.sumBy(sales, "quantity");
  const totalDiscountPercentage = _.sumBy(sales, "discount") / 100;
  const totalProfilt = _.sumBy(sales, "profit");
  return res.send({
    totalSales,
    totalQuantity,
    totalDiscountPercentage,
    totalProfilt,
  });
});

app.post("/charts", (req: Request, res: Response) => {
  const { selectedState, startDate, endDate } = req.body;
  let salesData = sales;
  if (selectedState) {
    salesData = _.filter(salesData, (s:Sale) => s.state == selectedState);
  }
  if (startDate && endDate) {
    salesData = _.filter(salesData,
      (s:Sale) => s.orderDate >= startDate && s.orderDate <= endDate
    );
  } else if (startDate) {
    salesData = _.filter(salesData,(s: Sale) => s.orderDate == startDate);
  } else if (endDate) {
    salesData = _.filter(salesData,(s: Sale) => s.orderDate == endDate);
  }
  const salesByCity = _.reduce(salesData, (acc: any, item: Sale) => {
    if (acc[item.city]) {
      acc[item.city] += item.sales;
    } else {
      acc[item.city] = item.sales;
    }
    return acc;
  }, {});

  const salesByProducts = _.reduce(salesData, (acc: any, item: Sale) => {
    if (acc[item.productName]) {
      acc[item.productName] += item.sales;
    } else {
      acc[item.productName] = item.sales;
    }
    return acc;
  }, {});

  const salesByCategory = _.reduce(salesData,(acc: any, item: Sale) => {
    if (acc[item.category]) {
      acc[item.category] += item.sales;
    } else {
      acc[item.category] = item.sales;
    }
    return acc;
  }, {});

  const salesBySubCategory = _.reduce(salesData,(acc: any, item: Sale) => {
    if (acc[item.subCategory]) {
      acc[item.subCategory] += item.sales;
    } else {
      acc[item.subCategory] = item.sales;
    }
    return acc;
  }, {});

  const salesBySegment = _.reduce(salesData,(acc: any, item: Sale) => {
    if (acc[item.segment]) {
      acc[item.segment] += item.sales;
    } else {
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
