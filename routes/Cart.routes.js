const express = require('express')
const router = express.Router()

const CartController = require ('../controllers/CartController')

router.get("/products-cart", CartController.getProductsCart);
router.get('/total-calories',CartController.TotalCalories)
router.post('/add-cart', CartController.addProductCart);


module.exports =router