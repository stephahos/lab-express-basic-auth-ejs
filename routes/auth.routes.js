const router = require("express").Router();
const app = require('../app')
const User= require("../models/user.model")
const bcrypt = require('bcryptjs');

/* GET Signup page */
router.get('/signup', (req, res, next) => {
    res.render('signup')
  });

/* POST Signup data */
router.post('/signup', async (req, res) => {
    try {
      const salt = bcrypt.genSaltSync(10)
      const hashedPassword = bcrypt.hashSync(req.body.password, salt)
  
      await User.create({
        username: req.body.username,
        password: hashedPassword,
      })
      res.redirect('/auth/login')
    } catch (error) {
      console.log(error.message)
      res.render('signup', { errorMessage: error.message, isConnected: false })
    }
  })

/* GET Login page */
router.get('/login', (req, res) => {
    res.render('login')
  })


  router.post('/login', async (req, res) => {
    const { username, password } = req.body
    const currentUser = await User.findOne({ username })
    if (!currentUser) {
      // What to do if I don't have a user with this username
      res.render('auth/login', { errorMessage: 'No user with this username', isConnected: false })
    } else {
      // console.log('Found User', currentUser)
      if (bcrypt.compareSync(password, currentUser.password)) {
        console.log('Correct password')
        // What to do if I have a user and the correct password
        /*const sessionUser = structuredClone(currentUser)
        delete sessionUser.password */
        req.session.user = currentUser
        res.redirect('/profile')
      } else {
        // What to do if I have a user and an incorrect password
        res.render('auth/login', { errorMessage: 'Incorrect password !!!', isConnected: false })
      }
    }
  })


  

  module.exports = router;