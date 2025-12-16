
const theatreController=require('../controllers/theatre.controller');
const theatreMiddlewares=require('../middlewares/theatre.middlewares');

const routes = (app)=>{
    app.post('/mba/api/v1/theatres',
        theatreMiddlewares.validateTheatreCreateRequest,
        theatreController.createTheatre
    );

    app.delete('/mba/api/v1/theatres/:id',theatreController.deleteTheatre);

    app.get('/mba/api/v1/theatres/:id',theatreController.getTheatre);

    app.get('/mba/api/v1/theatres',theatreController.getAllTheatre);

    //It will update movies within the particular theatre
    app.patch('/mba/api/v1/theatres/:id/movies',theatreMiddlewares.validateUpdateMoviesRequest,theatreController.updateMoviesInTheatre);

    app.patch('/mba/api/v1/theatres/:id',theatreController.updateTheatre);

    app.put('/mba/api/v1/theatres/:id',theatreController.updateTheatre);

    app.get('/mba/api/v1/theatres/:id/movies',theatreController.getMoviesInATheatre);


}

module.exports=routes;