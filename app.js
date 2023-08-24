import express from "express";
import ejs from "ejs";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import {User} from './model/user.js'
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

const port =3000;

const app = express();

app.set("view engine","ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

mongoose.set('strictQuery', true);
mongoose.connect("mongodb://localhost:27017/QRregistration");

const db = mongoose.connection;

    db.on("error",console.error.bind(console,"Error cannot connect the database"))
    db.once("open",()=>{
            console.log("Database Successfully connected to the server")});

app.get("/",(req,res)=>{
    res.render("Registration.ejs");
})

app.get("/register",(req,res)=>{
    res.render("formsubmit.ejs")
})

app.post("/register",async(req,res)=>{
    const date = new Date().toLocaleDateString('en-us', {year:"numeric", month:"long", day:"numeric"});
    const {name,nic,phoneNumber,address,reason} = req.body;
    const newUser = new User({name,nic,phoneNumber,address,reason,date});
    await newUser.save();
    res.redirect("/register")

})

app.get('/user',async(req,res)=>{
    const users = await User.find();
    res.render("user.ejs",{users})
})

app.get("/qr",(req,res)=>{
    res.render("QrInterface.ejs")
})

app.post("/qr",(req,res)=>{
    const scan = req.body.qr
      const  qr_png = qr.image(scan);
      qr_png.pipe(fs.createWriteStream('public/qr.png'))
      const png_string = qr.imageSync(scan);


    res.redirect("/qr")
})

app.listen(port,()=>{
    console.log(`Your Port listen to port ${port}`)
})

