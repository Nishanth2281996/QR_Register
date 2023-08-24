import mongoose from "mongoose";


const userSchema = new mongoose.Schema ({
    name : String,
    nic : String,
    phoneNumber : Number,
    address :String,
    reason : String,
    date:String
})


export const User = mongoose.model("User",userSchema);

 