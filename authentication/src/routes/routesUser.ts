import BaseRoutes from "./base/BaseRouter";
import User from "../controllers/User";
import validate from "../helpers/validate";
import { createUserSchema, updateUserSchema } from "../schema/User";

class UserRoutes extends BaseRoutes {
  public routes(): void {

    this.router.post("", validate(createUserSchema), User.create);
    this.router.patch(
      "/:id",
      validate(updateUserSchema),
      User.update
    );
    this.router.delete("/:id", User.delete);
    this.router.get("", User.findAll);
    this.router.get("/:id", User.findById);
  }
}

export default new UserRoutes().router