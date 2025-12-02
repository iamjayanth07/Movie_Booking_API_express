const Theatre=require('../models/theatre.model');

//Data -> contains the details of the theatre to be  created 
const createTheatre=async(data)=>{
        try {
            const response= await Theatre.create(data);
            console.log(response);
            return response;
            
        } catch (error) {
            //These are just for handling if the name parameter it should be minimum 5 character string ,if not it will not let to create any movie.Actually this is not required 

            if(error.name == 'ValidationError'){
                let err={};
                Object.keys(error.errors).forEach((key)=>{
                    err[key] = error.errors[key].message;

                })
                return {err:err,code:422};
            }
            //You may uncomment above whole if block if you do not want much code

            console.log(error);
            throw error;            
        }            
}


// id-> Which will be used to identify the theatre to be deleted
// return type:Object containing detail of the theatre
const deleteTheatre = async(id)=>{
    try {
        const response= await Theatre.findByIdAndDelete(id);
        
        if(!response){
            return {
                err:"No record of a theatre found for the given id",
                code:404,
            }
        } 
        return response;       
    } catch (error) {
        console.log(error);
        throw error;        
    }
}


// id-> Which will be used to identify the theatre to be deleted
// return type:Object containing detail of the theatre
const getTheatre = async (id)=>{
    try {
        const response=await Theatre.findById(id);
            if(!response){
            return {
                err:"No record of a theatre found for the given id",
                code:404,
            }
        }
        return response;        
    } catch (error) {
        console.log(error);
        throw error; 
        
    }
}

const getAllTheatre = async (data)=>{
    try {
        let query={};
        const response=await Theatre.find({});
        return response;        
    } catch (error) {
        console.log(error);
        throw error; 
        
    }
}

module.exports={
    createTheatre,
    deleteTheatre,
    getTheatre,
    getAllTheatre
}