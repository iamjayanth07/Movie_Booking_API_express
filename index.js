const express=require('express');
const bodyParser=require("body-parser");
const env=require("dotenv");
const  mongoose=require('mongoose');
const Movie = require('./models/movie.model');
const app = express(); //express application object
env.config();



app.get('/',(req,res)=>{
    console.log("Hitting the home")
    return res.json({
        success:true,
        message:"fetched home"
    })    
})

mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log('✅ Connected to MongoDB');

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server started on port ${process.env.PORT}`);
    });

    // Movie.create({
    //   name: "Inception",
    //   description: "A thief who steals corporate secrets through dream-sharing technology.",
    //   casts: ["Leonardo DiCaprio", "Joseph Gordon-Levitt"],
    //   trailorURL: "https://youtube.com/trailer/inception",
    //   language: "English",
    //   releaseDate: "2010-07-16",
    //   Director: "Christopher Nolan",
    //   releaseStatus: "RELEASED"
    // })
    // .then(newMovie => {
    //   console.log("🎬 Movie created:", newMovie);
    // })
    // .catch(err => {
    //   console.error("❌ Error creating movie:", err);
    // });
  })
  .catch((err) => {
    console.log('❌ Error connecting to MongoDB:', err);
  });

