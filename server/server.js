const express = require("express");
const cors = require("cors");
const connectToMongoDB = require("./config/db");
const userRoutes = require ("./routes/userRoutes.js");
const categoryRoutes =require( "./routes/categoryRoutes.js");
const productRoutes = require ("./routes/productRoutes.js");
const contactRoutes = require('./routes/contactRoutes.js');
const dotenv = require('dotenv');





dotenv.config();


const app = express();
const PORT = process.env.PORT || 4545 ;

app.use(express.json());
app.use(cors());


connectToMongoDB();


app.use("/api/auth", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes );
app.use('/api/contact', contactRoutes);

app.use('/', function(req,res){
  res.send('Welcome to nexahub');
})

app.listen(PORT, () => {
  console.log(`Successfully started the server at ${PORT}`);
});
