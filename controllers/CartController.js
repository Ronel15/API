const { response } = require("express");
const Cart = require("../models/Cart2");
const Kilo = require('../models/Cart')
const  subschema  = require("../models/subschema");
const Product = require("../models/Product");


// const addProductCart = async (req, res) => {
//   const { name, image, ingredients,carbohidratos,grasas, proteins ,kilocalorias} = req.body;

//   /* Nos fijamos si tenemos el producto */
//   const estaEnProducts = await Product.findOne({ name });

//   /* Nos fijamos si todos los campos vienen con info */
//   const noEstaVacio = name !== "" && image !== "" && ingredients !=="" &&kilocalorias !=="" &&grasas !== "" && proteins!=="";

//   /* Nos fijamos si el producto ya esta en el carrito */
//   const estaEnElCarrito = await Cart.findOne({ name });

//   /* Si no tenemos el producto */
//   if (!estaEnProducts) {
//     res.status(400).json({
//       mensaje: "Este producto no se encuentra en nuestra base de datos",
//     });

//     /* Si nos envian algo y no esta en el carrito lo agregamos */
//   } else if (noEstaVacio && !estaEnElCarrito) {
//     const newProductInCart = new Cart({ name, image, ingredients,proteins,carbohidratos,grasas,kilocalorias, amount: 1 });

//     /* Y actualizamos la prop inCart: true en nuestros productos */
//     await Product.findByIdAndUpdate(
//       estaEnProducts?._id,
//       { inCart: true, name, image, ingredients,carbohidratos,proteins,grasas,kilocalorias },
//       { new: true }
//     )
//       .then((product) => {
//         newProductInCart.save();
//         res.json({
//           mensaje: `El producto fue agregado al carrito`,
//           product,
//         });
//       })
//       .catch((error) => console.error(error));

//     /* Y si esta en el carrito avisamos */
//   } else if (estaEnElCarrito) {
//     res.status(400).json({
//       mensaje: "El producto ya esta en el carrito",
//     });
//   }
// };
  
// const TotalCalories = async (req, res) => {
//   const { carbohidratos,amount } = req.body;
  
//   const caloriesCount = await Cart.find({})
//   if(!caloriesCount) {
//       res.status(404).json({
//           ok: false,
//           msg: "No se encontraron registros en el carrito"
//       });
//   }
//   else {
//       let caloriesTotal=0;
//           caloriesCount.forEach(Cart => {
//           // calories=Cart.kilocalorias*4*Cart.amount ;
//           calories = Cart.ingredients.kilocalorias * 4 * Cart.amount;
//           caloriesTotal=calories
//       });
//       res.json({caloriesTotal});
//   }
// };


// const getProductsCart = async (req, res) => {
//   const productsCart = await Cart.find();

//   if (productsCart) {
//     res.json({ productsCart });
//   } else {
//     res.json({ mensaje: "No hay productos en el carrito" });
//   }
// };

// module.exports = { addProductCart,TotalCalories,getProductsCart};




//cart movil
const getCart = async (req, res) => {
  try {
  const carts = await Cart.find().populate('Products', 'name price image');
  res.json({ docs: carts });
  } catch (error) {
  res.status(500).json({ error: error.message });
  }
};

const getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id).populate('Products', 'name price image');
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.json({ docs: [cart] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const getProductInCart = async (req, res) => {
  try {
    const cartId = req.params.cartId;
    const productId = req.params.productId;

    const cart = await Cart.findById(cartId).populate('productos');
    if (!cart) {
      return res.status(404).json({ error: 'El carrito no existe' });
    }

    const product = cart.productos.find(p => p._id == productId);
    if (!product) {
      return res.status(404).json({ error: 'El producto no existe en este carrito' });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// const addToCart = async (req, res, next) => {
//   try {
//     const { productId } = req.params;
//     const { quantity } = req.body;
//     console.log('productId:', productId);
//     const product = await Product.findById(productId);
//     console.log('product:', product);


//     if (!product) {
//       return res.status(404).json({ message: 'Product not found' });
//     }
//     console.log(product)

//     const sessionId = req.sessionID;
//     const cart = await Cart.findOne({ sessionId });

//     if (!cart) {
//       const newCart = new Cart({
//         sessionId,
//         products: [{ product: productId, quantity }],
//       });
//       await newCart.save();
//       req.session.cartId = newCart._id; // Guardar el ID del carrito en la sesión
//     } else {
//       const existingProductIndex = cart.products.findIndex((p) => p.product == productId);

//       if (existingProductIndex >= 0) {
//         cart.products[existingProductIndex].quantity += quantity;
//       } else {
//         cart.products.push({ product: productId, quantity });
//       }

//       await cart.save();
//       req.session.cartId = cart._id; // Guardar el ID del carrito en la sesión
//     }

//     res.status(200).json({ message: 'Product added to cart' });
//   } catch (error) {
//     next(error);
//   }
// };




// const addToCart = async (req, res) => {
//   try {
//     let carrito = await Cart.findById(req.params.id);
//     // Si `carrito` no existe, crea un nuevo carrito con una propiedad `productos` vacía
// if (!carrito) {
//   carrito = new Cart({
//     productos: []
//   });
// }

//     const producto = await Product.findById(req.body.productoId);
//     if (!producto) {
//       return res.status(404).json({ error: 'Producto no encontrado' });
//     }
//     carrito.productos.push(producto);
//     await carrito.save();
//     res.json(carrito);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

const addToCart = async (req, res) => {
  try {
    const productoId = req.params.id;
    const product = await Product.findById(productoId)
      .select('-__v -createdAt -updatedAt') // Excluir campos que no se necesitan
      .lean();

    if (!product) {
      return res.status(404).json({ error: 'El producto no existe' });
    }

    // Agregar totalCalories al producto
    product.totalCalories = 500; // Cambiar 500 por el valor real de totalCalories

    let cart = await Cart.findById(req.params.id);
    if (!cart) {
      cart = new Cart({
        productos: [
          product
        ]
      });
    }
    cart.Products.push(product);
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const updateCart = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const { products } = req.body;
    
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId, // ID del carrito a actualizar
      { products }, // Datos a actualizar
      { new: true } // Opción para que devuelva el carrito actualizado
    );
    
    res.status(200).json({ cart: updatedCart });
  } catch (error) {
    next(error);
  }
}



// const ObjectId = require('mongoose').Types.ObjectId;

const removeFromCart = async (req, res, next) => {
  try {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    console.log(cart)
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }
    res.json({ message: 'Carrito eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//vaciar el carrito 
const removeAllFromCart = async (req, res, next) => {
  try {
    const result = await Cart.deleteMany({});
    console.log(result);
    res.json({ message: 'Carritos eliminados correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  updateCart,
  getProductInCart,
  getCartById,
  removeAllFromCart
};
