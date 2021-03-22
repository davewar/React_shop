const router = require('express').Router();

const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')

const paymentCtrl = require('../controllers/paymentCtrl')


router.route('/').get(auth, authAdmin, paymentCtrl.getPayments_get);
router.route('/').post(auth, paymentCtrl.createPayments_post);







module.exports = router;