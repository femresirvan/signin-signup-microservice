const Gamer = require('../Models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const getAllUsers = (req, res) => {
    Gamer.find()
        .then(sonuc => res.json(sonuc))
}

const signUp = async(req, res) => {
    try {
        var hashedSifre = bcrypt.hash(req.body.sifre, 8);
        var hash = JSON.stringify(hashedSifre) // hashesSifre object döndüğü için stringe çevirdik
        const gamer = Gamer.create({
            email: req.body.email,
            sifre: hash
        }, (err, user) => {
            if (err) {
                if (err.code == 11000) {
                    res.json("Emaili değiş...")
                } else if (err) {
                    res.json(err)
                }
            } else {
                res.json(`Ekleme başarılı... 
                    user: ${user}`)
            }
        })
    } catch (err) {
        res.json(err)
    }
}

const signIn = async(req, res) => {
    const gamer = await Gamer.findOne({ email: req.body.email }, (err, gamer) => {
        if (err) {
            res.json(err)
        } else if (!gamer) {
            res.json('Hatalı bilgi...') // e posta hatalı
        } else {
            const sifreKontrol = bcrypt.compare(req.body.sifre, gamer.sifre, (error, result) => {
                if (result) {
                    const token = jwt.sign({ id: gamer._id }, 'supersecret', {
                        expiresIn: '1h'
                    })
                    res.json({
                        gamer: gamer,
                        token: token
                    })
                }
                if (result == false) {
                    res.json('Hatalı bilgi...') // şifre hatalı
                }

            })
        }
    })
}
module.exports = {
    getAllUsers,
    signUp,
    signIn
}