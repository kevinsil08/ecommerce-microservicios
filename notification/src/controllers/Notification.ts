import { Request, Response } from "express";
import { Notification } from "../models/Notification";
import { NotificationRepo } from "../repository/NotificationRepo";

class NotificationController {
  async create(req: Request, res: Response) {
    try {
      const new_notification = new Notification();
      new_notification.user_id = req.body.user_id;
      new_notification.message = req.body.message;
      new_notification.is_read = false;

      await new NotificationRepo().save(new_notification);

      res.status(201).json({
        status: "Created!",
        message: "Successfully created notification!",
      });
    } catch (err) {
      console.log("❌ Create NotificationController: ",err);
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params["id"]);
      await new NotificationRepo().delete(id);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully deleted notification!",
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
      const new_notification = await new NotificationRepo().retrieveById(id);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched notification by id!",
        data: new_notification,
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
      const new_notification = await new NotificationRepo().retrieveAll();

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched all notification data!",
        data: new_notification,
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
      const new_notification = new Notification();

      new_notification.id = id;
      new_notification.is_read = true;
      
      await new NotificationRepo().update(new_notification);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully updated notification data!",
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }
}

export default new NotificationController()