const mongoose = require('mongoose');
const {Schema} = mongoose

const ContentSchema = new Schema({
    _id:{
        type:Schema.Types.ObjectId,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    course:{
        type:Schema.Types.ObjectId,
        ref:'Course',
        required:true
    }
})

const Content = mongoose.model('Content',ContentSchema);
module.exports = Content;