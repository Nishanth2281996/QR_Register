import mongoose from "mongoose";


const userSchema = {
    name : String,
    nic : String,
    phoneNumber : Number,
    address :String,
    reason : String
}


module.exports = mongoose.Schema("User",userSchema);

 