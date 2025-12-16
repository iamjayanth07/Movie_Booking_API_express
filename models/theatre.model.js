const mongoose=require('mongoose');

// Define the schema of theater resources to be stored in db
const theatreSchemas = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:5
        
    },
    description:{
        type:String,
               
    },
    city: {
        type:String,
        required:true
    },
    pincode: {
        type:Number,
        required:true
    },
    address: {
        type:String,
        
    },
    movies:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Movie'
    }   

},{timestamps:true});

const Theatre = mongoose.model('Theatre',theatreSchemas);

module.exports=Theatre;
