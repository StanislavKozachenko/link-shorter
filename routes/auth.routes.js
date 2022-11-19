const {Router, response} = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')
const {check, validationResult} = require('express-validator')
const router = Router();

router.post(
    '/register',
    [
        check('email', 'Email wrong...').isEmail(),
        check('password', 'Password wrong (At least 6 symbols)...').isLength({min:6})
    ],
    async (req, res)=>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Invalid data'
            })
        }

        const {email, password} = req.body

        const candidate = await User.findOne({email})

        if(candidate)
            return res.status(400).json({message: 'User is already registered on that email...'})
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = new User({email, password: hashedPassword})

        await user.save()

        res.status(201).json({message:'User was created!'})

    }
    catch (e) {
        res.status(500).json({message:'Something goes wrong, try again...'})
    }
})
router.post(
    '/login',
    [
        check('email', 'Enter correct email...').normalizeEmail().isEmail(),
        check('password', 'Enter password').exists()
    ],
    async (req, res)=>{
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Error while entering...'
                })
            }

            const {email, password} = req.body
            const user = await User.findOne({email})
            if(!user)
                return res.status(400).json({message: 'User was not found...'})
            const isMatch = await bcrypt.compareSync(password,user.password)
            if(!isMatch)
                return res.status(400).json({message: 'Something wrong, try again...'})
            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '1h'}
            )
            res.json({token, userId: user.id})
        }
        catch (e) {
            res.status(500).json({message:'Something goes wrong, try again...'})
        }
})
module.exports = router