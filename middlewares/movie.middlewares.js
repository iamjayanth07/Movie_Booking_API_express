
const badRequestResponse={
    success:false,
    error:{},
    data:{},
    message:"Malformed Request | Bad Request",
}


const validateMovieCreateRequest= async (req,res,next)=>{
    if(!req.body.name){
        badRequestResponse.error="The name of the movie is not present in the request sent";
        return res.status(400).json(badRequestResponse);
    }

    if(!req.body.description){
        badRequestResponse.error="The desc of the desc is not present in the request sent"
        return res.status(400).json(badRequestResponse)
    }

    if(!req.body.casts || !(req.body.casts instanceof Array) || req.body.casts.length <= 0){
        badRequestResponse.error="The casts of the desc is not present in the request sent"
        return res.status(400).json(badRequestResponse)
    }

    if(!req.body.trailorURL){
        badRequestResponse.error="The trailor of the desc is not present in the request sent"
        return res.status(400).json(badRequestResponse)
    }

    if(!req.body.releaseDate){
        badRequestResponse.error="The release of the desc is not present in the request sent"
        return res.status(400).json(badRequestResponse)
    }

    if(!req.body.Director){
        badRequestResponse.error="The director of the desc is not present in the request sent"
        return res.status(400).json(badRequestResponse)
    }

    

    next();

}

module.exports={
validateMovieCreateRequest,
}