import mongoose from 'mongoose';
import Day from './models/day';

require('dotenv').config()

const connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};
const models = { Day };
export { connectDb };
export default models;