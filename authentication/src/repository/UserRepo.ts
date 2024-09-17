import { User } from "../models/User";

interface IUserRepo {
  save(User: User): Promise<void>;
  update(User: User): Promise<void>;
  delete(userId: number): Promise<void>;
  retrieveById(userId: number): Promise<User>;
  retrieveAll(): Promise<User[]>;
}

export class UserRepo implements IUserRepo {

  async save(user: User): Promise<void> {
    try {
      await User.create({
        username: user.username,
        email: user.email,
        password: user.password,
        salt: user.salt,
      });
    } catch (error) {
      console.log("❌ Create UserRepo: ",error);
      throw new Error("Failed to create User!");
    }
  }

  async update(user: User): Promise<void> {
    try {
      const new_user = await User.findOne({
        where: {
          id: user.id,
        },
      });
      if (!new_user) {
        throw new Error("User not found!");
      }

      new_user.username = user.username;
      new_user.email = user.email;
      if(new_user.salt != user.salt){
        new_user.salt = user.salt;
        new_user.password = user.password;
      }

      new_user.changed('updatedAt', true);
      await new_user.update({
        username: new_user.username,
        email: new_user.email,
        password: new_user.password,
        salt: new_user.salt,
      });
    } catch (error) {
      console.log("❌ update UserRepo: ",error);
      throw new Error("Failed to create User!");
    }
  }

  async delete(userId: number): Promise<void> {
    try {
      const new_user = await User.findOne({
        where: {
          id: userId,
        },
      });
      if (!new_user) {
        throw new Error("User not found!");
      }

      await new_user.destroy();
    } catch (error) {
      console.log("❌ delete UserRepo: ",error);
      throw new Error("Failed to create User!");
    }
  }

  async retrieveById(userId: number): Promise<User> {
    try {
      const new_user = await User.findOne({
        attributes: ['id', 'username', 'email','createdAt','updatedAt'],
        where: {
          id: userId,

        },
      });
      if (!new_user) {
        throw new Error("User not found!");
      }
      return new_user;
    } catch (error) {
      console.log("❌ retrieveById UserRepo: ",error);
      throw new Error("Failed to create User!");
    }
  }

  async retrieveAll(): Promise<User[]> {
    try {
     return await User.findAll({
      attributes: ['id', 'username', 'email','createdAt','updatedAt'],
     });
    } catch (error) {
      console.log("❌ retrieveAll UserRepo: ",error);
      throw new Error("Failed to create User!");
    }
  }
  
}