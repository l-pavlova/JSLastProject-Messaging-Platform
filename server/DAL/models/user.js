const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    birthDate: {
        type: Date,
        default: Date.now()
    },
    password: {
        type: String
        //required:true
    },
    socialMediaFriends:  [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }]//contains list of friends names/ids
});

module.exports = mongoose.model('User', userSchema);