import mongoose from 'mongoose';

const PinSchema =  new mongoose.Schema({
   username:{
    type:String,
    require:true,
   }, 
   title:{
    type:String,
    require:true,
   }, 
   remark:{
    type:String,
    require:true,
   },
   lat:{
    type:Number,
    require:true,
   },  
   long:{
    type:Number,
    require:true,
   },  
},{timestamps:true});

const Pin = mongoose.model('pins', PinSchema);

export default Pin;

