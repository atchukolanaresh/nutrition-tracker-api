import mongoose from "mongoose";


let userSchema= mongoose.Schema({
    name:{type:String,
    required:true},
    email:{type:String,
        require:true},
    password:{type:String,
            require:true},
    age:{type:Number,
        require:true,
         min:12},

},{timestamps:true})

let userModel = mongoose.model("users",userSchema)


export default userModel



