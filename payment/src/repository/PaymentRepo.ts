import { Payment } from "../models/Payment";

interface IPaymentRepo {
  save(Payment: Payment): Promise<void>;
  update(Payment: Payment): Promise<void>;
  delete(paymentId: number): Promise<void>;
  retrieveById(paymentId: number): Promise<Payment>;
  retrieveAll(): Promise<Payment[]>;
}

export class PaymentRepo implements IPaymentRepo {

  async save(payment: Payment): Promise<void> {
    try {
      await Payment.create({
        user_id: payment.user_id,
        product_id: payment.product_id,
        amount: payment.amount,
        status: payment.status,
      });
    } catch (error) {
      console.log("❌ Create PaymentRepo: ",error);
      throw new Error("Failed to create Payment!");
    }
  }

  async update(payment: Payment): Promise<void> {
    try {
      const new_payment = await Payment.findOne({
        where: {
          id: payment.id,
        },
      });
      if (!new_payment) {
        throw new Error("Payment not found!");
      }
      new_payment.user_id = payment.user_id;
      new_payment.product_id = payment.product_id;
      new_payment.amount = payment.amount
      new_payment.status = payment.status;
      new_payment.changed('updatedAt', true);

      await new_payment.update({
        user_id: new_payment.user_id,
        product_id: new_payment.product_id,
        amount: new_payment.amount,
        status: new_payment.status,
      });
    } catch (error) {
      console.log("❌ update PaymentRepo: ",error);
      throw new Error("Failed to create Payment!");
    }
  }

  async delete(paymentId: number): Promise<void> {
    try {
      const new_payment = await Payment.findOne({
        where: {
          id: paymentId,
        },
      });
      if (!new_payment) {
        throw new Error("Payment not found!");
      }

      await new_payment.destroy();
    } catch (error) {
      console.log("❌ delete PaymentRepo: ",error);
      throw new Error("Failed to create Payment!");
    }
  }

  async retrieveById(paymentId: number): Promise<Payment> {
    try {
      const new_payment = await Payment.findOne({
        where: {
          id: paymentId,
        },
      });
      if (!new_payment) {
        throw new Error("Payment not found!");
      }
      return new_payment;
    } catch (error) {
      console.log("❌ retrieveById PaymentRepo: ",error);
      throw new Error("Failed to create Payment!");
    }
  }

  async retrieveAll(): Promise<Payment[]> {
    try {
     return await Payment.findAll();
    } catch (error) {
      console.log("❌ retrieveAll PaymentRepo: ",error);
      throw new Error("Failed to create Payment!");
    }
  }
  
}