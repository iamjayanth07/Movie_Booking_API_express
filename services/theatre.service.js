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
        let query = {};
        console.log(data);
         let pagination = {};
        
        if(data && data.city) {
            // this checks whether city is present in query params or not
            query.city = data.city;
        } 
        if(data && data.pincode) {
            // this checks whether pincode is present in query params or not
            query.pincode = data.pincode;
        }
        if(data && data.name) {
            // this checks whether name is present in query params or not 
            query.name = data.name;
        }

        // if(data && data.movieId) {
        //     query.movies = {$all: data.movieId};
        // }

        if(data && data.limit) {
            pagination.limit = data.limit;
        }
        
        //Skip like page number how many theatre record need to sent .if skip=2 means second page .If skip=7 means 7th page
        if(data && data.skip) {
            // for first page we send skip as 0
            let perPage = (data.limit) ? data.limit : 3;
            pagination.skip = data.skip*perPage;
        }

        const response=await Theatre.find(query,{},pagination);
        return response;        
    } catch (error) {
        console.log(error);
        throw error; 
        
    }
}

const updateMoviesInTheatre = async(theatreId,movieIds,insert)=>{

    const theatre=await Theatre.findById(theatreId);
    if(!theatre){
        return {
            err:"Theatre not found for the given id provided",
            code:404,
        }
    }

    if(insert){
        //We need to add movies
        movieIds.forEach(movieId=>{
           theatre.movies.push(movieId);
        })

    }else{
        //We need to remove movies.Here if the insert is false which means removing the 
        let savedMovieIds=theatre.movies;
        movieIds.forEach((movieId)=>{
            savedMovieIds=savedMovieIds.filter(smi => smi == movieId);

        });
        theatre.movies=savedMovieIds;
    }
    await theatre.save();//saving changes in the database
    // return theatre
    return theatre.populate('movies');// This will expand the details of the movie updated or added in the response body

    
}
module.exports={
    createTheatre,
    deleteTheatre,
    getTheatre,
    getAllTheatre,
    updateMoviesInTheatre
}