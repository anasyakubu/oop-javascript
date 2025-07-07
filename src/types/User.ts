import mongoose from "mongoose";


export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  userID: mongoose.Types.ObjectId;
  uid: string;
  name: string;
  email: string;
  username: string;
  password: string;
  phone: string;
  resetToken: string;
  resetTokenExpiry: string;
  role: string;
  address: string;
  photoURL: string;
  createdAt?: Date; updatedAt?: Date;
}