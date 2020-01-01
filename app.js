require('dotenv').config()

import express from 'express';
import { connectDb } from './mongo_db.js';

const app = express();

app.get('/api/v1/test', (req, res) => {
    res.status(200).send({
      success: 'true',
      message: 'test test'
    })
  });
  

connectDb().then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`Reservation app listening on port ${process.env.PORT}!`),
  );
});



