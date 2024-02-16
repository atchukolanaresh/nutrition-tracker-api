import mongoose from 'mongoose';
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
//local libraries
import userModel from './models/userModel.js';
import foodModel from './models/foodModel.js';
import verifyToken from './verifyToken.js';
import trackingModel from './models/trackingModel.js';





//database code
//db connection
mongoose.connect('mongodb://localhost:27017/nutrify').then(()=>{
    console.log('db connested');
}).catch((err)=>console.log(err));




























// //server side coding
const app = express()


app.use(express.json())



app.listen(8000,()=>console.log('server connected'))

//api for registeration
app.post('/register',(req,res)=>{
    let user = req.body
    bcrypt.genSalt(10,(err,salt)=>{
        if(!err){
            bcrypt.hash(user.password,salt,async (err,hpass)=>{
                if(!err){
                    user.password=hpass;
                    try{
                        let doc = await userModel.create(user)
                        res.status(201).send({messege:"user created"})
                    }
                    catch(err){
                        console.log(err)
                        res.status(500).send('somethin error')
                    }
                }
            })
        }
    })
})

//user login
app.post('/login', async (req, res) => {
    let userCred = req.body
    try {
        let dbUser = await userModel.findOne({ email: userCred.email })
        
        if (dbUser != null) {
    
            bcrypt.compare(userCred.password, dbUser.password, (err, result) => {
                if (result == true) {
                   
                    jwt.sign({email:userCred.email},'nutrify',(err,token)=>{
                    if(!err)
                    {   
                        
                        res.send({message:"Login Success",token:token,userid:dbUser._id,name:dbUser.name});
                    }
                    else{
                          console.log(err)
                        }
                    })
                }
                else {
                    res.status(403).send({ message: "Incorrect password" })
                }
            })
        }
        else {
            res.status(404).send({ message: "User not found" })
        }

    }
    catch (err) {
        console.log(err);
        res.status(500).send({ message: "Some Problem" })
    }
})


//search food item 
app.get('/foods/:name',verifyToken, async (req, res) => {
   
    try 
    {
        let foods = await foodModel.find({foodName:{$regex:req.params.name,$options:'i'}})
        if(foods.length!==0)
        {
            res.send(foods);
        }
        else 
        {
            res.status(404).send({message:"Food Item Not Fund"})
        }
    }
    catch(err)
    {
        console.log(err);
        res.status(500).send({message:"Some Problem while getting info"})
    }
})


//adding users foods in tracking db
app.post('/track',verifyToken,async (req,res)=>{
    let tracking = req.body
    try{
        let data = await trackingModel.create(tracking)
        res.status(201).send('food was added')

    }
    catch(err)
    {
        console.log(err);
        res.status(500).send({message:"Some Problem in adding the food"})
    }
})


//fetch fooods eaten by person api

app.get('/user/foods/:userId/:date',verifyToken,async (req,res)=>{
    let userId = req.params.userId
    let dateUrl = req.params.date.split('-')

   let formattedDate = new Date(`${dateUrl[2]}-${dateUrl[1]}-${dateUrl[0]}T00:00:00.000Z`);
    
    try{
        let date = formattedDate.toISOString();

        let data =await trackingModel.find({userId:userId,date:date}).populate("userId").populate('foodId')
        if(data.userId==null){
            res.send("no user")
        }
        else{
            res.send(data)
        }

    }
    catch(err)
    {
        console.log(err);
        res.status(500).send({message:"Some Problem in getting the food"})
    }
})










































//learn asychrous async and await promises
