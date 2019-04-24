const Question = require('../models/question')
class QuestionController {

    static findOne(req, res) {
        
        console.log('masuk sini/?');
        
        Question.findById(req.params.questionId)
        .populate('userId')
        .then(found => {
            if (found) res.status(200).json(found)
            else res.status(404).json({message : 'No such question'})
        })
        .catch(err => {
            console.log(err, 'err bagian cari qs');
            res.status(400).json(err)
        })
    }

    static findByUser(req, res) {
        // console.log('keterima pas minta');
        
        Question.find({userId : req.params.userId})
        .populate('userId')
        .then(found => {
            if (found) res.status(200).json(found)
            else res.status(404).json({message : 'No such question on that user'})
        })
        .catch(err =>{
            console.log(err, 'err bagian cari qs');
            res.status(400).json(err)
        })
    }

    static findAll(req, res) {
        // console.log('masuk get sini');
        
        Question.find({})
        .populate('userId')
        .then(found => {
            // console.log(found, 'datanya apa ya?');        
            if (found) res.status(200).json(found)
            else res.status(404).json({message : 'No such question'})
        })
        .catch(err => {
            console.log(err, 'err bagian cari qs');
            res.status(400).json(err)
        })
    }
    
    static createQuestion(req,res) {
        // console.log(req.authenticatedUser);
        
        Question.create({
            ...req.body,
            userId : req.authenticatedUser.id,
            upVotes : [],
            downVotes : []
        })
        .then(created => {
            console.log('berhasil bikin qs');
            res.status(201).json(created)
        })
        .catch(err => {
            console.log(err, 'bagian create qs');
            res.status(400).json(err)
        })
    }

    static deleteQuestion(req, res) {
        // console.log('masuk gak');
        
        Question.findByIdAndRemove({_id : req.params.questionId})
        .then(found => {
            if (found) res.status(200).json(found)
            else res.status(404).json({message : 'No such question'})
        })
        .catch(err => {
            console.log(err, '???err bagian delete qs');
            res.status(400).json(err)
        })
    }

    static updateQuestion(req, res) {
        Question.findByIdAndUpdate({_id : req.params.questionId}, {...req.body})
        .then(found => {
            if (found) res.status(200).json(found)
            else res.status(400).json({message : 'No such question'})
        })
        .catch(err =>{
            console.log(err, 'err bagian update qs');
            res.status(400).json(err)
        })
    }

    

    static downVote(req, res) {
        Question
        .findById(req.params.questionId)
        .then(quest => {

            let haveUpVoted = false
            quest.upVotes.forEach((uv, i) => {
                if (uv == req.authenticatedUser.id) {
                    haveUpVoted = true
                }
            })

            quest.downVotes.forEach(dv => {
                if (dv == req.authenticatedUser.id) {
                    throw new Error ('You have already downvoted!')
                }
            })


            if (haveUpVoted) {
                quest.upVotes = quest.upVotes.filter(x => {
                    return x.toString() != req.authenticatedUser.id
                })
            } else if (haveUpVoted == false) {
                console.log('mskn3');
                quest.downVotes.push(req.authenticatedUser.id)
            }

            return Question.findByIdAndUpdate({
                    _id: req.params.questionId
                }, {
                    $set: {
                        upVotes: quest.upVotes,
                        downVotes: quest.downVotes
                    }
                }, {
                    new: true
                })
                .then((updated) => {
                    console.log('msk4');

                    res.status(200).json(updated)
                })
                .catch(err => {
                    console.log(err,'/??');
                    
                    res.status(400).json(err)
                })
        })
    }

    static upVote(req, res) {
        console.log('MASUK MAU UPVOTE QS!!');
        
        console.log(req.authenticatedUser.id, 'bodi=====params', req.params.questionId);
        
    Question
        .findById(req.params.questionId)
        .then(quest => {
            let haveDownVoted = false
            
            quest.downVotes.forEach((dv, i) => {
                if (dv == req.authenticatedUser.id) {
                    haveDownVoted = true
                }
            })
            quest.upVotes.forEach(uv => {
                if (uv == req.authenticatedUser.id) {
                    throw new Error ('You have already upvoted!')
                }
            })

            if (haveDownVoted) {
                quest.downVotes = quest.downVotes.filter(x => {
                    return x.toString() != req.authenticatedUser.id
                })
            } else if (haveDownVoted == false) {
                console.log('msk3');
                quest.upVotes.push(req.authenticatedUser.id)
            }

            return Question.findByIdAndUpdate({
                    _id: req.params.questionId
                }, {
                    $set: {
                        downVotes: quest.downVotes,
                        upVotes: quest.upVotes
                    }
                }, {
                    new: true
                })
                .then((updated) => {
                    console.log('msk4');

                    res.status(200).json(updated)
                })
                .catch(err => {
                    console.log(err,'/??');
                    
                    res.status(400).json(err)
                })
        })
    }

}

module.exports = QuestionController
