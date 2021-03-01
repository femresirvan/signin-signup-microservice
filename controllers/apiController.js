const Gamer = require('../Models/userModel')

const getAllUsers = (req, res) => {
    Gamer.find()
        .then(sonuc => res.json(sonuc))
}

const oneUser = async(req, res) => {
    const ekleme = new Gamer(req.body);

    const sonuc = await ekleme.save()
    res.json("Ekleme başarılı: " + ekleme)
}

const giris = async(req, res) => {
    const emailKontrol = await Gamer.findOne({ email: req.body.email })
    if (emailKontrol.sifre == req.body.sifre) {
        res.json("giriş başarılı")
    } else {
        res.json("hatalı bilgi")
    }
}

module.exports = {
    getAllUsers,
    oneUser,
    giris
}