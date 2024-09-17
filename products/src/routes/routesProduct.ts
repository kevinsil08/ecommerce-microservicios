import BaseRoutes from "./base/BaseRouter";
import Product from "../controllers/Product";
import validate from "../helpers/validate";
import { createProductSchema, updateProductSchema } from "../schema/Product";

class ProductRoutes extends BaseRoutes {
  public routes(): void {

    this.router.post("", validate(createProductSchema), Product.create);
    this.router.patch(
      "/:id",
      validate(updateProductSchema),
      Product.update
    );
    this.router.delete("/:id", Product.delete);
    this.router.get("", Product.findAll);
    this.router.get("/:id", Product.findById);
  }
}

export default new ProductRoutes().router