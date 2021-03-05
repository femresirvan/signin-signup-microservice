const router = require('express').Router();
const homePageController = require('../controllers/homePageController');
const apiController = require('../controllers/apiController') //.default;

router.get('/', homePageController);
//router.get('/api', homePageController);
router.get('/api/getAllUsers', apiController.getAllUsers);
router.post('/api/signUp', apiController.signUp)
router.post('/api/signIn', apiController.signIn)
router.get('/api/me', apiController.auth, apiController.me, )

module.exports = router;