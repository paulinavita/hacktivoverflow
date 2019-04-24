const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class UserController {

    static register(req, res) {
        console.log(req.body)
        
        User.create({...req.body})
        .then(created => {
            console.log('berhasil bikin user');
            res.status(201).json(created)
        })
        .catch(err => {
            console.log(err, 'bagian login');
            res.status(400).json(err)
        })
    }

    static signInLocal(req, res) {
    console.log(req.body,'dapet apa ya?');
    
    User.findOne({ email: req.body.email })
        .then(found => {
            if (found) {
                if (!bcrypt.compareSync(req.body.password, found.password)) {
                    res.status(400).json({
                        msg: 'Invalid password/Email'
                    })
                } else {
                    let { email, _id } = found
                    let token = jwt.sign({ id: _id, email }, process.env.JWT_SECRET)
                    console.log('dapat token', token)
                    req.headers.token = token
                    res.status(200).json({ token, email, _id })
                }
            } else {
                console.log('sini')
                res.status(400).json({ msg: 'No such email' })
            }
        })
        .catch(err => {
            console.log(err, 'err bagian login')
            res.status(400).json(err)
        })
    }


}

module.exports = UserController