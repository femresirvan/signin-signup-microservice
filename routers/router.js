const router = require('express').Router();
const homePageController = require('../controllers/homePageController');
const apiController = require('../controllers/homePageController');

router.get('/', homePageController);
router.get('/api', apiController);

module.exports = router;