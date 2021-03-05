const mongoose = require('mongoose');
const schema = mongoose.Schema;

const gamerSchema = new schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        email: true
    },
    sifre: {
        type: String,
        //required: true,
        trim: true,
    }
})

const Gamer = mongoose.model('gamers', gamerSchema)

module.exports = Gamer;