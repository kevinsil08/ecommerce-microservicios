import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("🔍 Validating Request...")
      console.log(req.query);
      console.log(req.params);
      console.log(req.body);

      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      

      console.log("✅ Validation Success!")

      return next();
    } catch (err: any) {
      const error_message = JSON.parse(err.message);

      console.log("❌ Validation Error: ",error_message)
      console.log(req.body);
      return res.status(400).json({
        status: "Bad Request!",
        message: error_message[0].message,
      });
    }
  };

export default validate;