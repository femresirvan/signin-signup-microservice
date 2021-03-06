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
            res.json('Hatalı bilghjhji...') // e posta hatalı
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
const auth = async(req, res, next) => {
    try {
        const token = await req.headers['authorization'] && req.headers['authorization'].split(' ')[1]
        if (token == null) {
            return res.json('hata')
        }
        const sonuc = jwt.verify(token, 'supersecret')

        //console.log(sonuc);
        const bulunan = await Gamer.findById(sonuc.id)
        req.user = bulunan
        next()
    } catch (err) {
        console.log(err);
        res.json(err)
    }
}

const me = (req, res) => {
    res.json(req.user)
}
const me2 = (req, res) => {
    res.json(req.user)
}

const signUpwithGoogle = (req, res) => {
    res.redirect('/api/me2')
}

module.exports = {
    getAllUsers,
    signUp,
    signIn,
    auth,
    me,
    me2,
    signUpwithGoogle
}