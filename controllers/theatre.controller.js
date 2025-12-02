
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
        const response= await theatreService.getAllTheatre();
        
        successResponseBody.data=response;
        successResponseBody.message="successfully fetched all the theatre";
        return res.status(201).json(successResponseBody);        
    } catch (error) {
        console.log(error);
        errorResponseBody.error=error;
        res.status(500).json(errorResponseBody);
        
    }   

}

module.exports={
    createTheatre,
    deleteTheatre,
    getTheatre,
    getAllTheatre
}