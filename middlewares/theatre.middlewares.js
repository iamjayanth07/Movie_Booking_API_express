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
    next()//Everything is fine move to the next middleware
}

module.exports={
    validateTheatreCreateRequest

}