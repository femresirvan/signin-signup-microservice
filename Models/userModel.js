const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        email: true
    },
    password: {
        type: String,
        //required: true,
        trim: true,
    },
    userIsHere: {
        type: Boolean,
        default: true
    }
})

const User = mongoose.model('users2', userSchema)

module.exports = User;