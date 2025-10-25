const MovieController =require('../controllers/movie.controllers');

const routes =(app)=>{
    //routes frunction takes express app object as parameter
    app.post('/mba/api/vi/movies',MovieController.createMovie);
}

module.exports =routes;