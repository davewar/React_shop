const router = require('express').Router();

const userCtrl = require('../controllers/userCtrl')
const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')


router.route('/login').post(userCtrl.login_post);
router.route('/signup').post(userCtrl.signup_post);
router.route('/logout').get(userCtrl.logout_get);

router.route('/refresh_token').get(userCtrl.refreshToken_get)
router.route('/infor').get(auth, userCtrl.getUser_get)
router.route('/history').get(auth, userCtrl.history_get)

//delete user -admin
router.route('/delete/:id').delete(authAdmin,userCtrl.deleteUser_delete);

module.exports = router; 