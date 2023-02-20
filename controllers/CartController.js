const { response } = require("express");
const Cart = require("../models/Cart");
const Kilo = require('../models/Cart')
const  subschema  = require("../models/subschema");
const Product = require("../models/Product");


const addProductCart = async (req, res) => {
  const { name, image, ingredients,carbohidratos,grasas, proteins ,kilocalorias} = req.body;

  /* Nos fijamos si tenemos el producto */
  const estaEnProducts = await Product.findOne({ name });

  /* Nos fijamos si todos los campos vienen con info */
  const noEstaVacio = name !== "" && image !== "" && ingredients !=="" &&kilocalorias !=="" &&grasas !== "" && proteins!=="";

  /* Nos fijamos si el producto ya esta en el carrito */
  const estaEnElCarrito = await Cart.findOne({ name });

  /* Si no tenemos el producto */
  if (!estaEnProducts) {
    res.status(400).json({
      mensaje: "Este producto no se encuentra en nuestra base de datos",
    });

    /* Si nos envian algo y no esta en el carrito lo agregamos */
  } else if (noEstaVacio && !estaEnElCarrito) {
    const newProductInCart = new Cart({ name, image, ingredients,proteins,carbohidratos,grasas,kilocalorias, amount: 1 });

    /* Y actualizamos la prop inCart: true en nuestros productos */
    await Product.findByIdAndUpdate(
      estaEnProducts?._id,
      { inCart: true, name, image, ingredients,carbohidratos,proteins,grasas,kilocalorias },
      { new: true }
    )
      .then((product) => {
        newProductInCart.save();
        res.json({
          mensaje: `El producto fue agregado al carrito`,
          product,
        });
      })
      .catch((error) => console.error(error));

    /* Y si esta en el carrito avisamos */
  } else if (estaEnElCarrito) {
    res.status(400).json({
      mensaje: "El producto ya esta en el carrito",
    });
  }
};
  
const TotalCalories = async (req, res) => {
  const { carbohidratos,amount } = req.body;
  
  const caloriesCount = await Cart.find({})
  if(!caloriesCount) {
      res.status(404).json({
          ok: false,
          msg: "No se encontraron registros en el carrito"
      });
  }
  else {
      let caloriesTotal=0;
          caloriesCount.forEach(Cart => {
          // calories=Cart.kilocalorias*4*Cart.amount ;
          calories = Cart.ingredients.kilocalorias * 4 * Cart.amount;
          caloriesTotal=calories
      });
      res.json({caloriesTotal});
  }
};


const getProductsCart = async (req, res) => {
  const productsCart = await Cart.find();

  if (productsCart) {
    res.json({ productsCart });
  } else {
    res.json({ mensaje: "No hay productos en el carrito" });
  }
};



module.exports = { addProductCart,TotalCalories,getProductsCart};