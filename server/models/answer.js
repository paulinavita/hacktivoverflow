const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answerSchema = new Schema({
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
    questionId : {
        type : Schema.Types.ObjectId,
        ref : 'Question',
        required: [true, 'QuestionId is required']
    },
    upVotes : {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    },
    downVotes : {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    }

})


let Answer = mongoose.model('Answer', answerSchema)
module.exports = Answer
