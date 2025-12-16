// This object will be used as template for error response
const errorResponseBody ={
    success:false,
    message:"Something went wrong cannot process the request",
    data:{},
    error:{},
}

// This object will be used as template for success response
const successResponseBody={
    success:true,
    message:"Successfully processed the requests",
    data:{},
    error:{},
}


module.exports={
    errorResponseBody,
    successResponseBody
}