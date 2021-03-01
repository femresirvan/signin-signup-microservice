const router = require('express').Router();
const homePageController = require('../controllers/homePageController');
const apiController = require('../controllers/apiController') //.default;

router.get('/', homePageController);
//router.get('/api', homePageController);
router.get('/api/getAllUsers', apiController.getAllUsers);
router.post('/api/oneUser', apiController.oneUser)
router.post('/api/giris', apiController.giris)

module.exports = router;