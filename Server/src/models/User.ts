import { Document, model, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  createAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createAt: { type: Date, default: Date.now },
});

export const User = model<IUser>("User", UserSchema, "users");
