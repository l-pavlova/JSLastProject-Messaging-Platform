const { Router } = require('express');
const User = require('../models/user');
const router = Router();

router.get('/', (req,res)=>{
    console.log('at user home sme');
    res.send('user home');
})

router.post('/register',  async(req, res) => {
    const user = new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        birthDate: req.body.birthDate,
        password: req.body.password
    })
    console.log(user);
   try {
        console.log('registering user in db')
        let createdUser = await user.save();
        res.redirect(`/user/${createdUser.id}`)
    } catch (e) {
        console.log(e);
        res.render('/');
        console.log('Failed regisetring')
    }
})

router.post('/login',  async(req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })
   console.log(user);
   try {
        console.log('logging user')
        let located = await User.findOne({ email: user.email }).exec();
       //add validation middleware for password
       res.send(located);
    } catch (e) {
        console.log(e);
        res.render('/');
        console.log('Failed logging')
    }
})

router.get('/:id', async(req, res, next) => {
    console.log(`logged user with ${req.params.id}`);
    const user = await User.findById(req.params.id);
    if(user == null) res.redirect('/');
    res.send(user);
})

router.get('/friend/:id', async(req, res, next) => {
    console.log(`getting friend details for:`)
    const user = await User.findById(req.params.id);
    if(user == null) res.redirect('/');
    res.send(user);
})

router.get('/friends', async(req, res, next) => {
    console.log('list of users');
    const currentUser = await User.findById(req.params.id);

    const friends = [];
    for(let friendId of currentUser.socialMediaFriends) {
        let friend = await User.findById(friendId);//todo: add all from db here
        friends.push(friend);
    }
    res.send(friends);
})

module.exports = router;