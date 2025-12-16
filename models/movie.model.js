const mongoose =require('mongoose');

const movieSchemas = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    description:{
        type:String,
        required:true,
        
    },
    casts: {
        type:[String],
        required:true
    },
    trailorURL: {
        type:String,
        required:true
    },
    language: {
        type:String,
        required:true,
        default:"English"
    },
    releaseDate: {
        type:String,
        required:true
    },
    Director: {
        type:String,
        required:true
    },
    releaseStatus: {
        type:String,
        required:true,
        default:"RELEASED",
    },
    

},{timestamps:true});

//timestamps gives createdAt and updatedAt values

const Movie = mongoose.model('Movie',movieSchemas);//creates a new model

module.exports= Movie;
