import mongoose from 'mongoose';


const trackingSchema = mongoose.Schema({
    userId:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
    },
    foodId:{
        required:true,
        type:mongoose.Schema.Types.ObjectId,
        ref:'foods',
   
    },
    date:{type: Date,
        default: () => new Date().setUTCHours(0, 0, 0, 0)}

},{timestamps:true})


const trackingModel = mongoose.model('trackings',trackingSchema)


export default trackingModel;