const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questionSchema = new Schema({
    title : {
        type : String,
        required : [true, 'Title is required']
    },
    description : {
        type : String,
        required : [true, 'Description is required']
    },
    createdAt : {
        type : Date,
        default : new Date()
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User',
        required: [true, 'UserId is required']
    },
    upVotes : {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    downVotes : {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    }
})


let Question = mongoose.model('Question', questionSchema)
module.exports = Question
