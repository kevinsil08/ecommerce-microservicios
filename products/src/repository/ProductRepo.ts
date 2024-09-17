import { Product } from "../models/Product";

interface IProductRepo {
  save(Product: Product): Promise<void>;
  update(Product: Product): Promise<void>;
  delete(productId: number): Promise<void>;
  retrieveById(productId: number): Promise<Product>;
  retrieveAll(): Promise<Product[]>;
}

export class ProductRepo implements IProductRepo {

  async save(product: Product): Promise<void> {
    try {
      await Product.create({
        name: product.name,
        description: product.description,
        price: product.price,
        status: product.status,
        stock_quantity: product.stock_quantity,
      });
    } catch (error) {
      console.log("❌ Create ProductRepo: ", error);
      throw new Error("Failed to create Product!");
    }
  }

  async update(product: Product): Promise<void> {
    try {
      const new_product = await Product.findOne({
        where: {
          id: product.id,
        },
      });
      if (!new_product) {
        throw new Error("Product not found!");
      }

      new_product.name = product.name;
      new_product.description = product.description;
      new_product.price = product.price;
      new_product.stock_quantity = product.stock_quantity;
      new_product.status = product.status;

      new_product.changed('updatedAt', true);
      await new_product.update({

        name: new_product.name,
        description: new_product.description,
        price: new_product.price,
        stock_quantity: new_product.stock_quantity,
        status: new_product.status

      });
    } catch (error) {
      console.log("❌ update ProductRepo: ", error);
      throw new Error("Failed to create Product!");
    }
  }

  async delete(productId: number): Promise<void> {
    try {
      const new_product = await Product.findOne({
        where: {
          id: productId,
        },
      });
      if (!new_product) {
        throw new Error("Product not found!");
      }

      await new_product.destroy();
    } catch (error) {
      console.log("❌ delete ProductRepo: ", error);
      throw new Error("Failed to create Product!");
    }
  }

  async retrieveById(productId: number): Promise<Product> {
    try {
      const new_product = await Product.findOne({
        where: {
          id: productId,
        },
      });
      if (!new_product) {
        throw new Error("Product not found!");
      }
      return new_product;
    } catch (error) {
      console.log("❌ retrieveById ProductRepo: ", error);
      throw new Error("Failed to create Product!");
    }
  }

  async retrieveAll(): Promise<Product[]> {
    try {
      return await Product.findAll();
    } catch (error) {
      console.log("❌ retrieveAll ProductRepo: ", error);
      throw new Error("Failed to create Product!");
    }
  }

}