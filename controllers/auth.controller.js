const userService=require('../services/user.service');
const {errorResponseBody,successResponseBody}=require("../utils/responseBody")


const signup= async(req,res)=>{
    try {
        const response=await userService.createUser(req.body);
        successResponseBody.data=response;
        successResponseBody.message="successfully registred a user";
        return res.status(200).json(successResponseBody);
        
    } catch (error) {
        errorResponseBody.error=error;
        return res.status(500).json(errorResponseBody);
        
    }
}

module.exports={
    signup,

}