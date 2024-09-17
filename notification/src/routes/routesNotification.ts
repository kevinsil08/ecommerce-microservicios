import BaseRoutes from "./base/BaseRouter";
import Notification from "../controllers/Notification";
import validate from "../helpers/validate";
import { createNotificationSchema, updateNotificationSchema } from "../schema/Notification";

class NotificationRoutes extends BaseRoutes {
  public routes(): void {

    this.router.post("", validate(createNotificationSchema), Notification.create);
    this.router.patch(
      "/:id",
      validate(updateNotificationSchema),
      Notification.update
    );
    this.router.delete("/:id", Notification.delete);
    this.router.get("", Notification.findAll);
    this.router.get("/:id", Notification.findById);
  }
}

export default new NotificationRoutes().router