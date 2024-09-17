import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { UserRepo } from "../repository/UserRepo";
import { generateToken } from "../config/authMiddleware";


class UserController {
  async create(req: Request, res: Response) {
    try {
      console.log('req.body',req.body)
      const new_user = new User();
      new_user.username = req.body.username;
      new_user.email = req.body.email;

      const salt_generated = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt_generated);
      new_user.salt = salt_generated;
      new_user.password = hash;

      await new UserRepo().save(new_user);

      res.status(201).json({
        status: "Created!",
        message: "Successfully created user!",
        token: "Bearer " + generateToken(new_user),
      });
    } catch (err) {
      console.log("❌ Create UserController: ",err);
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = parseInt(req.params["id"]);
      await new UserRepo().delete(id);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully deleted user!",
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
      const new_user = await new UserRepo().retrieveById(id);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched user by id!",
        data: new_user,
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
      const new_user = await new UserRepo().retrieveAll();

      res.status(200).json({
        status: "Ok!",
        message: "Successfully fetched all user data!",
        data: new_user,
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
      const new_user = new User();

      new_user.id = id;
      new_user.username = req.body.username;
      new_user.email = req.body.email;
      const salt_generated = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt_generated);
      new_user.salt = salt_generated;
      new_user.password = hash;

      await new UserRepo().update(new_user);

      res.status(200).json({
        status: "Ok!",
        message: "Successfully updated user data!",
        token: "Bearer " + generateToken(new_user),
      });
    } catch (err) {
      res.status(500).json({
        status: "Internal Server Error!",
        message: "Internal Server Error!",
      });
    }
  }
}

export default new UserController()