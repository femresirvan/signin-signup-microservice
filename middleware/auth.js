module.exports = async function auth(req, res, next) {
    try {
        const token = await req.headers['authorization'] && req.headers['authorization'].split(' ')[1]
        if (token == null) {
            return res.json('hata')
        }
        const sonuc = jwt.verify(token, 'supersecret')

        //console.log(sonuc);
        const bulunan = await User.findById(sonuc.id)
        req.user = bulunan
        next()
    } catch (err) {
        console.log(err);
        res.json(err)
    }
}