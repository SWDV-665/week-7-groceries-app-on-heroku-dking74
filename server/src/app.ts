import express from 'express';
import cors from 'cors';

import v1 from './v1';
import './mongoose.connector';
import { BaseErrorResponse } from './exceptions';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1', v1);
app.use('*', (req, res) => {
  console.log('The route does not exist!');
  res.status(404).send({ status: 404, message: 'The route does not exist!' });
});
app.use((err, req, res, next) => {
  if (err instanceof BaseErrorResponse) {
    res.status(err.statusCode).json({ status: err.statusCode, message: err.errorMessage });
  }
  console.debug('An expected error occurred. Original Error: ' + err.toString());
  res.status(500).send(err.toString());
});

export default app;