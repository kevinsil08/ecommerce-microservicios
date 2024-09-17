import BaseRoutes from "./base/BaseRouter";
import Payment from "../controllers/Payment";
import validate from "../helpers/validate";
import { createPaymentSchema, updatePaymentSchema } from "../schema/Payment";

class PaymentRoutes extends BaseRoutes {
  public routes(): void {

    this.router.post("", validate(createPaymentSchema), Payment.create);
    this.router.patch(
      "/:id",
      validate(updatePaymentSchema),
      Payment.update
    );
    this.router.delete("/:id", Payment.delete);
    this.router.get("", Payment.findAll);
    this.router.get("/:id", Payment.findById);
  }
}

export default new PaymentRoutes().router