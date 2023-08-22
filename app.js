import express from "express";
import ejs from "ejs";
import mongoose from "mongoose";
import bodyParser from "body-parser";
const port =3000;

const app = express();

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));





mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/QRregistration");

const db = mongoose.connection;

    db.on("error",console.error.bind(console,"Error cannot connect the database"))
    db.once("open",()=>{
            console.log("Database Successfully connected to the server")});

app.get("/",(req,res)=>{
    res.render("Registration.ejs");
})



app.listen(port,()=>{
    console.log(`Your Port listen to port ${port}`)
})