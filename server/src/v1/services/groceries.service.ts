import mongoose from 'mongoose';

import GroceryModel, { Grocery } from '../models/Grocery';

export async function getAllGroceries() {
  return GroceryModel.find().exec();
}

export function getGroceryItem(id: string) {
  return GroceryModel.findById(mongoose.Types.ObjectId(id)).exec();
}

export async function createGroceryItem(grocery: Grocery) {
  return GroceryModel.create(grocery);
}

export async function updateGroceryItem(id: string, grocery: Grocery) {
  return GroceryModel.updateOne({ _id: mongoose.Types.ObjectId(id) }, grocery).exec();
}

export function deleteGroceryItem(id: string) {
  return GroceryModel.deleteOne({ _id: mongoose.Types.ObjectId(id) }).exec();
}

export default {
  getAllGroceries,
  getGroceryItem,
  createGroceryItem,
  updateGroceryItem,
  deleteGroceryItem
}