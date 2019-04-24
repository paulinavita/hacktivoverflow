const router = require('express').Router()
const answer = require('./answer')
const question = require('./question')
const user = require('./user')

router.get('/', (req, res) => {
    res.status(200).json({msg : 'connected!'})
})
router.use("/users", user)
router.use("/questions", question)
router.use("/answers", answer)



module.exports = router