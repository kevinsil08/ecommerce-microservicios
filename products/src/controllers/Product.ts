import { Request, Response } from "express";
import { Product } from "../models/Product";
import { ProductRepo } from "../repository/ProductRepo";

class ProductController {
  async create(req: Request, res: Response) {
    try {
      const new_product = new Product();
      new_product.name = req.body.name;
      new_product.description = req.body.description;
      new_product.price = req.body.price;
      new_product.status = '1';
      new_product.stock_quantity = req.body.stock_quantity

      await new ProductRepo().save(new_product);

      res.status(201).json({
        status: "Created!",
        message: "Successfully created product!",
      });
    } catch (err) {
      console.log("❌ Create ProductController: ",err);
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params["id"]);
      await new ProductRepo().delete(id);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully deleted product!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async findById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params["id"]);
      const new_product = await new ProductRepo().retrieveById(id);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched product by id!",
        data: new_product,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const new_product = await new ProductRepo().retrieveAll();

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched all product data!",
        data: new_product,
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params["id"]);
      const new_product = new Product();

      new_product.id = id;
      new_product.name = req.body.name;
      new_product.description = req.body.description;
      new_product.price = req.body.price;
      new_product.status = '1';
      new_product.stock_quantity = req.body.stock_quantity

      await new ProductRepo().update(new_product);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully updated product data!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }
}

export default new ProductController()