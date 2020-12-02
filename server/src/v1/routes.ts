import express from 'express';
import { BadRequestErrorResponse, NotFoundErrorResponse } from '../exceptions';

import controllers from './controllers/groceries.controller';
import services from './services/groceries.service';

const router = express.Router();

router.get('/groceries', controllers.getAllGroceries);
router.get('/groceries/:id', controllers.getGrocery);
router.post('/groceries', controllers.createGrocery);
router.put('/groceries/:id', controllers.updateGrocery);
router.delete('/groceries/:id', controllers.deleteGrocery);

export default router;