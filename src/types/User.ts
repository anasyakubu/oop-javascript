import mongoose from "mongoose";


export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  uid: string;
  name: string;
  username: string;
  phone: string;
  resetToken: string;
  resetTokenExpiry: string;
  address: string;
  photoURL: string;
  createdAt?: Date; updatedAt?: Date;
}