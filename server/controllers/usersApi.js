
const { Router } = require('express');
const Repository = require('../DAL/collectionRepository.js');
const collectionMap = require('../DAL/dbSchemas/collectionMappings.js');
const bcrypt = require('bcrypt');

const User = require('../DAL/models/user.js')

const router = Router();
let userRepo = {};

function initializeRepo(adapter, collection) {
    console.log(`creating repository for ${collection}`)
    userRepo = new Repository(adapter, collection);
}

router.use((req, res, next) => {
    initializeRepo(req.adapter, "User");
    next();
})

router.get('/', (req, res) => {
    res.send('user home');
})

router.get('/all', async (req, res, next) => {
    try {
        await userRepo.find().then((result) => {
            res.send(result);
        });
    } catch (err) {
        console.log(err);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        await userRepo.findById(req.params.id).then((user) => {
            res.send(user)
        });
    } catch (err) {
        console.log(err);
        //res.redirect('/')
    }
})

router.get('/friend/:id', async (req, res, next) => {
    await userRepo.findById(req.params.id)
        .then(user => res.send(user));
}).post('/friend/:id', async (req, res, next) => {
    let query = { _id: req.params.id };
    let socialMediaFriends = [].push(new User()); //todo map to real ones
    userRepo.updateOne(query, socialMediaFriends)
})

router.get('/friends/:id', async (req, res, next) => {
    //todo: get current user from cookie not from request params 
    const currentUser = await userRepo.findById(req.params.id);

    const friends = [];
    if (currentUser.socialMediaFriends.length > 0) {
        for (let friendId of currentUser.socialMediaFriends) {
            let friend = userRepo.findById(friendId);
            friends.push(friend);
        }
    }
    res.send(friends);
})

router.post('/uploadPicture', async(req, res, next) => {
    console.log('in surver upload');
   
    const profilePic = req.body.file;
    const id = req.body.id;

    await userRepo.updateOne(id, profilePic);
})


module.exports = router;