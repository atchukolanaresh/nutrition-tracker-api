import mongoose from 'mongoose';

//schema
const foodSchema = mongoose.Schema(({
    foodName:String,
    calories:Number

}))

//model
const foodModel = mongoose.model('foods',foodSchema)

export default foodModel
