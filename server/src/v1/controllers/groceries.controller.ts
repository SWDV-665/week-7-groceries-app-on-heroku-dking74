import { Request, Response } from 'express';

import { NotFoundErrorResponse, ServerErrorResponse } from '../../exceptions';
import { Grocery } from '../models/Grocery';
import services from '../services/groceries.service';

export function getAllGroceries(req: Request, res: Response, next) {
  services.getAllGroceries()
    .then(groceries => res.status(200).json(groceries))
    .catch(error => next(new ServerErrorResponse(error)));
}

export function getGrocery(req: Request, res: Response, next) {
  const groceryItemId = req.params.id;
  services.getGroceryItem(groceryItemId)
    .then(groceryItem => {
      if (groceryItem === null) {
        return next(new NotFoundErrorResponse());
      }
      res.status(200).json(groceryItem);
    })
    .catch(error => next(new ServerErrorResponse(error)));
}

export function createGrocery(req: Request, res: Response, next) {
  const grocery: Grocery = req.body;
  services.createGroceryItem(grocery)
    .then(grocery => res.status(201).json(grocery))
    .catch(error => next(new ServerErrorResponse(error)));
}

export function updateGrocery(req: Request, res: Response, next) {
  const groceryItemId: string = req.params.id;
  const groceryUpdate: Grocery = req.body;
  services.updateGroceryItem(groceryItemId, groceryUpdate)
    .then(grocery => res.status(200).json(grocery))
    .catch(error => next(new ServerErrorResponse(error)));
}

export function deleteGrocery(req: Request, res: Response, next) {
  const groceryItemId: string = req.params.id;
  services.deleteGroceryItem(groceryItemId)
    .then(grocery => res.status(200).json(grocery))
    .catch(error => next(new ServerErrorResponse(error)));
}

export default {
  getAllGroceries,
  getGrocery,
  createGrocery,
  updateGrocery,
  deleteGrocery,
}