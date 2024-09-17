import { Notification } from "../models/Notification";

interface INotificationRepo {
  save(Notification: Notification): Promise<void>;
  update(Notification: Notification): Promise<void>;
  delete(notificationId: number): Promise<void>;
  retrieveById(notificationId: number): Promise<Notification>;
  retrieveAll(): Promise<Notification[]>;
}

export class NotificationRepo implements INotificationRepo {

  async save(notification: Notification): Promise<void> {
    try {
      await Notification.create({
        user_id: notification.user_id,
        message: notification.message,
        is_read: notification.is_read,
      });
    } catch (error) {
      console.log("❌ Create NotificationRepo: ",error);
      throw new Error("Failed to create Notification!");
    }
  }

  async update(notification: Notification): Promise<void> {
    try {
      const new_notification = await Notification.findOne({
        where: {
          id: notification.id,
        },
      });
      
      if (!new_notification) {
        throw new Error("Notification not found!");
      }

      new_notification.is_read = notification.is_read;
      new_notification.changed('updatedAt', true);

      await new_notification.update({
        is_read: new_notification.is_read,
      });
    } catch (error) {
      console.log("❌ update NotificationRepo: ",error);
      throw new Error("Failed to create Notification!");
    }
  }

  async delete(notificationId: number): Promise<void> {
    try {
      const new_notification = await Notification.findOne({
        where: {
          id: notificationId,
        },
      });
      if (!new_notification) {
        throw new Error("Notification not found!");
      }

      await new_notification.destroy();
    } catch (error) {
      console.log("❌ delete NotificationRepo: ",error);
      throw new Error("Failed to create Notification!");
    }
  }

  async retrieveById(notificationId: number): Promise<Notification> {
    try {
      const new_notification = await Notification.findOne({
        where: {
          id: notificationId,
        },
      });
      if (!new_notification) {
        throw new Error("Notification not found!");
      }
      return new_notification;
    } catch (error) {
      console.log("❌ retrieveById NotificationRepo: ",error);
      throw new Error("Failed to create Notification!");
    }
  }

  async retrieveAll(): Promise<Notification[]> {
    try {
     return await Notification.findAll();
    } catch (error) {
      console.log("❌ retrieveAll NotificationRepo: ",error);
      throw new Error("Failed to create Notification!");
    }
  }
  
}