const router = require("express").Router();
const app = require('../app')

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index')
})

/* GET Profile page */
router.get('/profile', (req, res) => {
  console.log('SESSION =====>', req.session)
  res.render('profile')
  /*if (req.session.user) {
    res.render('profile', { user: req.session.user, isConnected: true })
  } else { 
    res.redirect('/login')*/
  }
)

module.exports = router;
