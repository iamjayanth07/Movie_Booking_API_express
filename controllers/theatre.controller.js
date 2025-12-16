
const theatreService=require('../services/theatre.service');
const {errorResponseBody,successResponseBody}=require("../utils/responseBody")


const createTheatre = async (req,res)=>{
    try {
        const response= await theatreService.createTheatre(req.body);
        if(response.err){
            errorResponseBody.error=response.err;
            errorResponseBody.message="Validation failed on few parameter of the request body";
            return res.status(response.code).json(errorResponseBody);

        }
        successResponseBody.data=response;
        successResponseBody.message="successfully created the data";
        return res.status(201).json(successResponseBody);        
    } catch (error) {
        console.log(error);
        errorResponseBody.error=error;
        res.status(500).json(errorResponseBody);
        
    }   

}

const deleteTheatre = async (req,res)=>{
    try {
        const response= await theatreService.deleteTheatre(req.params.id);
        
        if(response.err){
            errorResponseBody.error=response.err;
            return res.status(response.code).json(errorResponseBody);

        }
        successResponseBody.data=response;
        successResponseBody.message="successfully deleted the given theatre";
        return res.status(201).json(successResponseBody);        
    } catch (error) {
        console.log(error);
        errorResponseBody.error=error;
        res.status(500).json(errorResponseBody);
        
    }   

}

const getTheatre = async (req,res)=>{
    try {
        const response= await theatreService.getTheatre(req.params.id);
        
        if(response.err){
            errorResponseBody.error=response.err;
            return res.status(response.code).json(errorResponseBody);

        }
        successResponseBody.data=response;
        successResponseBody.message="successfully fetched the theatre";
        return res.status(201).json(successResponseBody);        
    } catch (error) {
        console.log(error);
        errorResponseBody.error=error;
        res.status(500).json(errorResponseBody);
        
    }   

}

const getAllTheatre = async (req,res)=>{
    try {
        console.log(req.query);
        const response= await theatreService.getAllTheatre(req.query);
        
        successResponseBody.data=response;
        successResponseBody.message="successfully fetched all the theatre";
        return res.status(201).json(successResponseBody);        
    } catch (error) {
        console.log(error);
        errorResponseBody.error=error;
        res.status(500).json(errorResponseBody);
        
    }   

}

// TheatreId:Unique id of the theatre for which we want to update the movie
//movieIds: Array of movie ids that are expected to be updated in a theatre
//Insert:boolean that tells whether we want to add movie or remove them
// returns theatre object

const updateMoviesInTheatre = async (req,res)=>{
    try {
        const response=await theatreService.updateMoviesInTheatre(
            req.params.id,
            req.body.movieIds,
            req.body.insert
        );
        if(response.err){
            errorResponseBody.error=response.err;
            res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data=response;
        successResponseBody.message="Successfully updated the movie in a theatre";
        return res.status(200).json(successResponseBody);
        
    } catch (error) {
        console.log(error);
        errorResponseBody.error=error;
        res.status(500).json(errorResponseBody);

        
    }
}

const updateTheatre = async (req, res) => {
    try {
        const response = await theatreService.updateTheatre(req.params.id, req.body);
        if(response.err){
            errorResponseBody.err=response.err;
            return res.status(response.code).json(errorResponseBody);

        }
        successResponseBody.data = response;
        successResponseBody.message = "Successfully updated the theatre";
        return res.status(200).json(successResponseBody);
    } catch (error) {
        if(error.err) {
            errorResponseBody.err = error.err;
            return res.status(error.code).json(errorResponseBody);
        }
        errorResponseBody.err = error;
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(errorResponseBody);
    }
}

const getMoviesInATheatre = async (req, res) => {
    try {
        const response = await theatreService.getMoviesInATheatre(req.params.id);
        if(response.err) {
            errorResponseBody.error = response.err;
            return res.status(response.code).json(errorResponseBody);
        }
        successResponseBody.data = response;
        successResponseBody.message = "Successfully fetched the movies for the theatre";
        return res.status(200).json(successResponseBody);
    } catch (error) {
        errorResponseBody.error = error;
        return res.status(500).json(errorResponseBody);
    }
}


module.exports={
    createTheatre,
    deleteTheatre,
    getTheatre,
    getAllTheatre,
    updateMoviesInTheatre,
    updateTheatre,
    getMoviesInATheatre
}