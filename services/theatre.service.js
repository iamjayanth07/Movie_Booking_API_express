const Theatre=require('../models/theatre.model');
// const Movie=require('../models/movie.model');

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

        if(data && data.movieId) {
            query.movies = {$all: data.movieId};
        }

        if(data && data.limit) {
            pagination.limit = data.limit;
        }
        
        //Skip like page number how many theatre record need to sent .if skip=2 means second page .If skip=7 means 7th page
        if(data && data.skip) {
            // for first page we send skip as 0
            let perPage = (data.limit) ? data.limit : 3;
            pagination.skip = data.skip*perPage;
        }

        const response=await Theatre.find(query,{},pagination);//
        return response;        
    } catch (error) {
        console.log(error);
        throw error; 
        
    }
}

//Insert:true means adding movie,false means removing movie
// "insert":false,
// "movieIds":["68fc5681628ca65a8940edec"]
//JSON required to pass for updating movies in a theatre
const updateMoviesInTheatre = async(theatreId,movieIds,insert)=>{

        try {
        let theatre;
        if (insert) {
            // we need to add movies
            theatre = await Theatre.findByIdAndUpdate(
                {_id: theatreId},
                {$addToSet: {movies: {$each: movieIds}}},
                {new: true}
            );
        } else {
            // we need to remove movies
            theatre = await Theatre.findByIdAndUpdate(
                {_id: theatreId},
                {$pull: {movies: {$in: movieIds}}},
                {new: true}
            );
        }
        
        return theatre.populate('movies');//This will show the updated theatre detail in the response body
    } catch (error) {
        if(error.name == 'TypeError') {
            return {
                code: 404,
                err: 'No theatre found for the given id'
            }
        }
        console.log("Error is", error);
        throw error;
    }    
   
}

const updateTheatre = async (id, data) => {
    try {
        const response = await Theatre.findByIdAndUpdate(id, data, {
            new: true, runValidators: true
        });//new :true returns the updated data
        if(!response) {
            // no record found for the given id
            throw {
                err: "No theatre found for the given id",
                code: 404
            }
        }
        return response;
    } catch (error) {
        if(error.name == 'ValidationError') {
            let err = {};
            Object.keys(error.errors).forEach((key) => {
                err[key] = error.errors[key].message;
            });
            throw {err: err, code: 422}
        }
        throw error;
    }
}


module.exports={
    createTheatre,
    deleteTheatre,
    getTheatre,
    getAllTheatre,
    updateMoviesInTheatre,
    updateTheatre,
}