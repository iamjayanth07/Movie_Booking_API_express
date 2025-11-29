const mongoose = require('mongoose');
const Movie=require('../models/movie.model');
const movieService=require('../services/movie.service');
const {errorResponseBody,successResponseBody}=require("../utils/responseBody")


const createMovie = async (req,res)=>{
    try{
        const movie = await movieService.createMovie(req.body);
        successResponseBody.data=movie;
        successResponseBody.message="successfully created the movie";
        return res.status(201).json(successResponseBody);

    }catch(err){
        console.log(err);
        return res.status(500).json(errorResponseBody);
    }
}


const deleteMovie = async (req,res)=>{
    try{
        console.log(req.params.id);
        const response =await movieService.deleteMovie({_id:req.params.id});
        successResponseBody.data=response;
        successResponseBody.message=`successfully deleted ${response.name} the movie`;
        return res.status(200).json(successResponseBody);

    }catch(err){
       console.log(err);
       return res.status(500).json(errorResponseBody); 
    }
}




const getMovie =async (req,res)=>{
    try{
        // This code written which was before implementing findById in the service layer because code should not look more in the controller.Model=Midel+service
        // const movie=await Movie.findById(req.params.id);
         
        const response=await movieService.getMovieById(req.params.id);

        if(response.err){
            errorResponseBody.error=response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data=response;
        successResponseBody.message=`Successfully fetched ${response.name} movie`;
        return res.status(200).json(successResponseBody);


    }catch(err){
        console.log(err);
        return res.status(500).json(errorResponseBody);
        // return res.status(500).json(errorResponseBody);
    }
}

const updateMovie = async(req,res)=>{
    try {
        const movie=await movieService.updateMovie(req.params.id,req.body);
        
        successResponseBody.data=movie;
        return res.status(200).json(successResponseBody);
    } catch (err) {
        console.log(err);
        errorResponseBody.error=err;
        return res.status(500).json(errorResponseBody);
        
    }
}



module.exports ={
    createMovie,
    deleteMovie,
    getMovie,
    updateMovie
}