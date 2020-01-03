import mongoose from 'mongoose';
import Hour from './hour.js'
var hourSchema = new mongoose.Schema({
    hour: { 
      type: Number,
      unique: true,
    },
    count: {
      type: Number,
      required:true  
    }
  
  });


const daySchema = new mongoose.Schema({
  date: {
      type: Date,
      required: true,
      unique:true
  },
  //hours: [{hour:{type: Number}, count: {type:Number}}]
  hours:[hourSchema]
});
const Day = mongoose.model('Day', daySchema);
export default Day;