import { Document, Schema, model } from 'mongoose';

export interface Grocery {
  name: String,
  quantity: Number,
  price: Number
}

export interface GroceryDocument extends Grocery, Document {
}

const GrocerySchema = new Schema({
  name: {
    type: String,
    required: true,
    index: { unique: true, sparse: true }
  },
  quantity: Number,
  price: Number
});

export default model('Grocery', GrocerySchema);