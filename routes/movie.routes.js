const movieController =require('../controllers/movie.controllers');

const routes =(app)=>{
    //routes frunction takes express app object as parameter
    app.post('/mba/api/v1/movies',movieController.createMovie);

    app.delete('/mba/api/v1/movies/:id',movieController.deleteMovie);
    //this example for query param where after the : id is variable and it will be present in the query property

    app.get('/mba/api/v1/movies/:id',movieController.getMovie)
}

module.exports =routes;