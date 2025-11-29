const express=require('express');
const bodyParser=require("body-parser");
const env=require("dotenv");
const  mongoose=require('mongoose');
const MovieRoutes=require('./routes/movie.routes');



const app = express(); //express application object
env.config();

//configure body params
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());

app.use(express.json());  
app.use(express.urlencoded({ extended: true }));


MovieRoutes(app);//Invoking movie route


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

    
  })
  .catch((err) => {
    console.log('❌ Error connecting to MongoDB:', err);
  });

