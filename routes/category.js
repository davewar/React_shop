const router = require('express').Router();
const categoryCtrl = require('../controllers/categoryCtrl')


router.route('/').get(categoryCtrl.getCategories_get);
router.route('/add').post(categoryCtrl.addCategories_post);
router.route('/:id').delete(categoryCtrl.deleteCategories_delete);
router.route('/update/:id').post(categoryCtrl.updateCategories_post);

module.exports = router;