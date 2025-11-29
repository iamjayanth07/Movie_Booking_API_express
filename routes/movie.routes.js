const movieController =require('../controllers/movie.controllers');
const movieMiddlewares=require('../middlewares/movie.middlewares');
const routes =(app)=>{
    //routes frunction takes express app object as parameter
    app.post('/mba/api/v1/movies',movieMiddlewares.validateMovieCreateRequest,movieController.createMovie);

    app.delete('/mba/api/v1/movies/:id',movieController.deleteMovie);
    //this example for query param where after the : id is variable and it will be present in the query property

    app.get('/mba/api/v1/movies/:id',movieController.getMovie);

    app.put('/mba/api/v1/movies/:id',movieController.updateMovie);

    app.patch('/mba/api/v1/movies/:id',movieController.updateMovie);

    app.get('/mba/api/v1/movies',movieController.getMovies);
    
}

module.exports =routes;

//Here put and patch both are used modifiy the content of the data 
//PUT is used change the whole data 
//PATCH is used to change part of the data 
//For example if i want to change only name and language of the movie i can perform PATCH request method.But if i want to change entire values of the data(movie) i can perform PUT request data
