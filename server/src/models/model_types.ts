import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  shoppingCart: object[];
}

export interface IItem extends Document {
  itemName: string;
  itemPrice: string;
  itemCategory: string;
  itemsInStock: number;
}
