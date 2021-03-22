const router = require('express').Router();

const auth = require('../middlewares/auth')
const authAdmin = require('../middlewares/authAdmin')

const productCtrl = require('../controllers/productsCtrl')


router.route('/').get(productCtrl.getProducts_get);

//admin
router.route('/add').post(auth, authAdmin,productCtrl.addproducts_post);
router.route('/:id').delete(auth, authAdmin, productCtrl.deleteProduct_delete);
router.route('/update/:id').post(auth, authAdmin, productCtrl.updateProduct_post);





module.exports = router;