const Answer = require('../models/answer')

class AnswerController {

    static findOne(req, res) {
        console.log('masuk findone');
        console.log(req.params.answerId);
    
        Answer.findById(req.params.answerId)
            .then(found => {
                if (found) res.status(200).json(found)
                else res.status(404).json({
                    message: 'No such answer'
                })
            })
            .catch(err => {
                console.log(err, 'err bagian cari ans');
                res.status(400).json(err)
            })
    }

    static findByQuestion(req, res) {
        // console.log('apa??? dpt ga??', req.params.questionId);

        Answer.find({
                questionId: req.params.questionId
            })
            .populate('userId')
            .then(found => {
                // console.log('masuk', found, '////////////////asdasdasd');

                if (found) res.status(200).json(found)
                else res.status(404).json({
                    message: 'No such answer'
                })
            })
            .catch(err => {
                console.log(err, 'err bagian cari ans');
                res.status(400).json(err)
            })
    }

    static createAnswer(req, res) {
        // console.log(req.authenticatedUser.id, 'siapa login');

        console.log('isi req body, ada qs id ga?', req.body);
        Answer.create({
                ...req.body,
                userId: req.authenticatedUser.id,
                upVotes: [],
                downVotes: [],
            })
            .then(created => {
                // console.log('berhasil bikin ans');
                res.status(201).json(created)
            })
            .catch(err => {
                console.log(err, 'bagian create ans');
                res.status(400).json(err)
            })
    }

    static deleteAnswer(req, res) {
            
        Answer.findByIdAndRemove({
                _id: req.params.answerId
            })
            .then(found => {
                if (found) res.status(200).json(found)
                else res.status(404).json({
                    message: 'No such answer'
                })
            })
            .catch(err => {
                console.log(err.response, 'err bagian delete ans');
                res.status(400).json(err)
            })
    }

    static updateAnswer(req, res) {
        Answer.findByIdAndUpdate({
                _id: req.params.answerId
            }, {...req.body}, {new : true})
            .then(found => {
                if (found) res.status(200).json(found)
                else res.status(400).json({
                    message: 'No such answer'
                })
            })
            .catch(err => {
                console.log(err, 'err bagian update ans');
                res.status(400).json(err)
            })
    }

    static upVote(req, res) {
        // console.log(req.body, 'apakah ada isi reqbody d upv');
        
        // Answer
        //     .findByIdAndUpdate(
        //         (req.params.answerId), 
        //         {$pull : {downVotes : req.authenticatedUser.id}, 
        //         $addToSet : {upVotes : req.authenticatedUser.id}},
        //         {'new': true})
        //     .then(updated => {
        //         res.status(200).json(updated)
        //     })
        //     .catch(err =>{
        //         res.status(400).json(updated)
        //     })
        Answer
            .findById(req.params.answerId)
            .then(answer => {
                let haveDownVoted = false
                
                answer.downVotes.forEach((dv, i) => {
                    if (dv == req.authenticatedUser.id) {
                        haveDownVoted = true
                    }
                })
                answer.upVotes.forEach(uv => {
                    if (uv == req.authenticatedUser.id) {
                        throw new Error ('You have already upvoted!')
                    }
                })


                if (haveDownVoted) {
                    answer.downVotes = answer.downVotes.filter(x => {
                        return x.toString() != req.authenticatedUser.id
                    })
                } else if (haveDownVoted == false) {
                    console.log('msk3');
                    answer.upVotes.push(req.authenticatedUser.id)
                }

                return Answer.findByIdAndUpdate({
                        _id: req.params.answerId
                    }, {
                        $set: {
                            downVotes: answer.downVotes,
                            upVotes: answer.upVotes
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

    static downVote(req, res) {
        // console.log(req, 'ini req nya');

        // Answer
        //     .findByIdAndUpdate(
        //         (req.params.answerId), 
        //         {$pull : {upVotes : req.authenticatedUser.id}, 
        //         $addToSet : {downVotes : req.authenticatedUser.id}},
        //         {'new': true})
        //     .then(updated => {
        //         res.status(200).json(updated)
        //     })
        //     .catch(err =>{
        //         res.status(400).json(updated)
        //     })
            

        Answer
        .findById(req.params.answerId)
        .then(answer => {

            let haveUpVoted = false
            answer.upVotes.forEach((uv, i) => {
                if (uv == req.authenticatedUser.id) {
                    haveUpVoted = true
                }
            })

            answer.downVotes.forEach(dv => {
                if (dv == req.authenticatedUser.id) {
                    throw new Error ('You have already downvoted!')
                }
            })


            if (haveUpVoted) {
                answer.upVotes = answer.upVotes.filter(x => {
                    return x.toString() != req.authenticatedUser.id
                })
            } else if (haveUpVoted == false) {
                console.log('mskn3');
                answer.downVotes.push(req.authenticatedUser.id)
            }

            return Answer.findByIdAndUpdate({
                    _id: req.params.answerId
                }, {
                    $set: {
                        upVotes: answer.upVotes,
                        downVotes: answer.downVotes
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

module.exports = AnswerController