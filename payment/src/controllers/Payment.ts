import { Request, Response } from "express";
import { Payment } from "../models/Payment";
import { PaymentRepo } from "../repository/PaymentRepo";

class PaymentController {
  async create(req: Request, res: Response) {
    try {
      const new_payment = new Payment();
      new_payment.user_id = req.body.user_id;
      new_payment.product_id = req.body.product_id;
      new_payment.amount = req.body.amount;
      new_payment.status = 'pending';

      await new PaymentRepo().save(new_payment);

      res.status(201).json({
        status: "Created!",
        message: "Successfully created payment!",
      });
    } catch (err) {
      console.log("❌ Create PaymentController: ",err);
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params["id"]);
      await new PaymentRepo().delete(id);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully deleted payment!",
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
      const new_payment = await new PaymentRepo().retrieveById(id);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched payment by id!",
        data: new_payment,
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
      const new_payment = await new PaymentRepo().retrieveAll();

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched all payment data!",
        data: new_payment,
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
      const new_payment = new Payment();

      new_payment.id = id;
      new_payment.user_id = req.body.user_id;
      new_payment.product_id = req.body.product_id;
      new_payment.amount = req.body.amount;
      new_payment.status = 'pending';

      await new PaymentRepo().update(new_payment);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully updated payment data!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }
}

export default new PaymentController()