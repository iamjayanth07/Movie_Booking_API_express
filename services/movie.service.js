const Movie =require('../models/movie.model');

const createMovie=async(data)=>{
        const movie= await Movie.create(data);
        return movie;    
}

const deleteMovie=async(id) => {
    const response=await Movie.deleteOne(id);
    return response;
}

const getMovieById =async (id)=>{
    const movie=await Movie.findById(id);
    console.log("Movie found ",movie);
    if(!movie){
        return{
            err:"No movie found for the corresponding id provided",
            code:404,
            
        }        
    };
    return movie;
}

const updateMovie = async(id,data)=>{
    const movie=await Movie.findByIdAndUpdate(id,data,{new:true});//{new:true} this property gives after updated movie data.If not old data gives
    console.log(movie);
    return movie;
}

const fetchMovies =async(filter)=>{
    let query={};
    if(filter.name){
        query.name=filter.name;
    }
    let movies=await Movie.find(query);
    if(!movies){
        return {
            err:"Not able to find the queries of movies",
            code:404
        }
    }
    return movies;
}

module.exports ={
    getMovieById,
    createMovie,
    deleteMovie,
    updateMovie,
    fetchMovies
}