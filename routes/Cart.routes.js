// const express = require('express')
// const router = express.Router()

// const CartController = require ('../controllers/CartController')

// router.get("/products-cart", CartController.getProductsCart);
// router.get('/total-calories',CartController.TotalCalories)
// router.post('/add-cart', CartController.addProductCart);


// module.exports =router

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/CartController');

router.get('/cart', cartController.getCart);
router.post('/:id/agregar-producto', cartController.addToCart);
router.delete('/cart/:id', cartController.removeFromCart);
router.get('/find/:id', cartController.getCartById);
router.put('/cart/:id', cartController.updateCart);

router.delete('/cart', cartController.removeAllFromCart);

module.exports = router;
