const errorResponseBody ={
    success:false,
    message:"Something went wrong cannot process the request",
    data:{},
    error:{},
}

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