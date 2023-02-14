const router = require('express').Router();
const User = require('../models/User')

const bcrypt = require('bcryptjs')

router.post('/register', async (req, res) => {

    const {name, email, password} = req.body
    // console.log(name +' ' + email + ' ' + password)

    if(!name || !email || !password){
        res.status(400).send("Please add all fields")
        return
        // throw new Error("Please add all fields")
    }

    const userExists = await User.findOne({email})
    if(userExists)
    {
        res.status(400).send("User already exists")
        return
        // throw new Error('User already exists')
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    try{
        const user = new User({
            name:name,
            email: email,
            password: hashedPassword
        })
        const savedUser = await user.save()
        res.status(201).json({
            _id: user.id,
            email: user.email,
            name: user.name
        })
        // res.status(200).send(savedUser)
    }
    catch(err){
        console.log(err)
        res.status(400).send(err);
        return
    }
})


router.post('/login', async(req,res) => {
    const {email, password} = req.body
    if(!email || !password)
    {
        res.status(400).send('Please enter all the fields')
        return

    }

    const userExists = await User.findOne({email})

    if(!userExists){
        res.status(400).send('Wrong email or password')
        return
    }

    const validPass = await bcrypt.compare(password, userExists.password)

    if(!validPass){
        res.status(400).send('Wrong password')
        return
    }
    res.status(200).json({
        _id: userExists.id,
        email: userExists.email,
        name: userExists.name,
        message: "Successfully logged in"
    })})

// router.get('/getuser', (req, res) => {
//     res.status(200).json(req.user)
// })
//Generate JWT
// const generateToken = (id) => {
//     return jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET,{
//         expiresIn: '1d'
//     })
// }
module.exports = router;