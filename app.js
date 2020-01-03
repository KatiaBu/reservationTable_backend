require('dotenv').config()

import express from 'express';
import { connectDb } from './mongo_db.js';
import routes from './routes.js';
import parser from 'body-parser';
import cors from 'cors'

const app = express();

app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));
app.use('/api', routes);

connectDb().then(async () => {
  app.listen(process.env.PORT, () =>
    console.log(`Reservation app listening on port ${process.env.PORT}!`),
  );
});



