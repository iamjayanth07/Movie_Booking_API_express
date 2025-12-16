const {errorResponseBody}=require('../utils/responseBody');
const validateTheatreCreateRequest=async(req,res,next)=>{

    if(!req.body.name){
        errorResponseBody.message="Name of the theatre is not present in the request";
        return res.status(400).json(errorResponseBody);

    }
    if(!req.body.pincode){
        errorResponseBody.message="Pincode of the theatre is not present in the request";
        return res.status(400).json(errorResponseBody);
    }

    if(!req.body.city){
        errorResponseBody.message="City of the theatre is not present in the request";
        return res.status(400).json(errorResponseBody);
    }
    next();//Everything is fine move to the next middleware
}

const validateUpdateMoviesRequest = async (req, res, next) => {
    // validattion of insert parameter
    if(req.body.insert == "undefined") {
        errorResponseBody.message = "The insert parameter is missing in the request";
        return res.status(400).json(errorResponseBody);
    }
    // validate movieIds presence
    if(!req.body.movieIds) {
        errorResponseBody.message = "No movies present in the request to be updated in theatre";
        return res.status(400).json(errorResponseBody);
    }
    // validate if movieIds is an array or not
    //Usually if you pass movieIds in sting format this error comes .Always you ahould pass as array of string not just string
    if(!(req.body.movieIds instanceof Array)) {
        errorResponseBody.message = "Expected array of movies but found something else";
        return res.status(400).json(errorResponseBody);
    }
    // validate if movieIds is empty or not
    if(req.body.movieIds.length == 0) {
        errorResponseBody.message = "No movies present in the array provided";
        return res.status(400).json(errorResponseBody);
    }
    // everything is fine
    next();
}

module.exports={
    validateTheatreCreateRequest,
    validateUpdateMoviesRequest

}