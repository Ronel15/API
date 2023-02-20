const { response } = require("express");
const { populate } = require("../models/Product");
// const Product = require("../models/Product");
const Product = require('../models/Product');
const Cart = require('../models/Cart')
const Subcategory = require("../models/Subcategory");

const index = (req, res, next) => {
  const limit = parseInt(req.query.limit, 10) || 9;
  const page = parseInt(req.query.page, 10) || 1;

  Product.paginate({}, { limit, page })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json({
        message: "Error",
      });
    });
};
//show the list of products
// const index =(req, res, next)=> {
// const limit = parseInt(req.query.limit,10) ||10;
// const page =parseInt(req.query.page, 10) ||1;

//     Product.paginate({},{page:req.query.page, limit:req.query.limit})
//     .then(response=>{
//     res.json({
//         response
//         })
//     })
//     .catch(error=>{
//         res.json({
//             message:'Error'
//         })
//     })
// }
const show = (req, res) => {
  if (req.body.error) return res.status(500).send({ error });
  if (!req.body.products) return res.status(404).send({ message: "NOT FOUND" });
  let products = req.body.products;
  return res.status(200).send({ products });
};
//add  new product
const store = (req, res, next) => {

  let name = req.body.name;
  Product.findOne({ name })
    .then(product => {
      if (!product) {
        let product = new Product({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price,
          nutrition: req.body.nutrition,
          category: req.body.category,
          subcategory: req.body.subcategory,
          totalCalories: req.body.totalCalories,
          inCart: req.body.inCart,

          // images: [
          //   { data: req.files[0].buffer, contentType: req.files[0].mimetype },
          //   { data: req.files[1].buffer, contentType: req.files[1].mimetype },
          //   { data: req.files[2].buffer, contentType: req.files[2].mimetype }
          // ],
          ingredients: req.body.ingredients
        });
        if (req.file) {
          const url = req.protocol + '://' + req.get('host')
          product.image = url + '/uploads/' + req.file.filename


        }
        product
          .save()
          .then(response => {
            res.json({
              message: "Product Added Successfully"
            });
          })
          .catch(error => {
            res.json({
              message: "An error occurred"
            });
          });
      } else {
        res.json({
          message: "The product is already registered in the database"
        });
      }
    })
};

const update = (req, res) => {

  if (req.body.error) return res.status(500).send({ error });
  if (!req.params.key) return res.status(404).send({ message: "NOT FOUND" });
  let product = req.params.key;
  product = Object.assign(product, req.body);
  product
    .save()
    .then((product) => res.status(200).send({ message: "UPDATED", product }))
    .catch((error) => res.status(500).send({ error }));


};

const remove = (req, res) => {
  if (req.body.error) return res.status(500).send({ error });
  if (!req.body.products) return res.status(404).send({ message: "NOT FOUND" });
  req.body.products[0]
    .remove()
    .then((product) => res.status(200).send({ message: "REMOVED", product }))
    .catch((error) => res.status(500).send({ error }));
};

const removeByid = async (req, res) => {
  const { idproduct } = req.params;
  await Product.findByIdAndDelete(idproduct);
  res.json("producto elimininado")
};
const find = (req, res, next) => {
  let query = {};
  query[req.params.key] = new RegExp(req.params.value, 'i');
  Product.find(query)
    .then((products) => {
      if (!products.length) return next();
      req.body.products = products;
      return next();
    })
    .catch((error) => {
      req.body.error = error;
      next();
    });
};

const search = async (req, res, next) => {
  try {
    const products = await Product.find(
      {
        name: { $regex: `^${req.params.query}$`, $options: 'i' }
      }
    );
    res.json(products);
  } catch (error) {
    res.status(400).json({ message: 'Error al procesar la peticion' })
  }
}

const searchProductByName = async (req, res) => {
  try {
    const { name } = req.query;
    const product = await Product.findOne({ name: { $regex: name, $options: 'i' } });
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar el producto' });
  }
};


const category = async (req, res, next) => {
  try {
    const products = await Product.find(
      {
        category: new RegExp(req.params.query, 'i'),

      }
    );
    if (products == "") {
      res.json('No hay productos')
    }
    else {

      res.json(products);
    }
  } catch (error) {
    res.status(400).json({ message: 'Error al procesar la peticion' })
  }
}
// const byid = async(req, res) => {
//   const {idproduct5} = req.params;
//   await Product.findById(idproduct);
//   res.json("producto elimininado")
// };


const buscar = async (req, res) => {
  Product.findById(req.params.id).populate({
    path: "name"
  })
    .then(product => {
      if (!product) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.id
        });
      }
      res.send(product);
    }).catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Product not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error retrieving product with id " + req.params.id
      });
    });
}

const getProductsCart = async (req, res) => {
  const products = await Product.find();

  if (Product) {
    res.json({ products });
  } else {
    res.json({ mensaje: "No hay productos en el carrito" });
  }
};




// ----------------------------------------------------------
// Suma de precio de los productos
const Contar = Product.find({}, (err, products) => {
  if (err) {
    // handle error
  } else {
    // map through products and extract prices
    const prices = products.map(product => product.price);
    // use reduce to sum prices
    const totalPrice = prices.reduce((acc, val) => acc + val, 0);
    // do something with totalPrice
  }
});


// Ejemplo:

const Calcular = async (req, res) => {
  Product.find({ res }, (err, products) => {
    if (err) {
      // handle error
    } else {
      // map through products and extract prices
      const prices = products.map(product => product.price);
      // use reduce to sum prices
      const totalPrice = prices.reduce((acc, val) => acc + val, 0);
      // create new document to save total price
      const totalPriceDoc = new Cart({ total: totalPrice });
      totalPriceDoc.save((error, doc) => {
        if (error) {
          // handle error
        } else {
          // return total price in response
          res.send({ total: totalPrice });
        }
      });
    }
  });
}

const updateProduct = async (req, res) => {
  Product.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, { new: true }, function (err, product) {
    if (err) return next(err);
    res.send(product);
  });
};


// -------------------------------------------------------------------------------
module.exports = {
  updateProduct,
  index,
  show,
  store,
  find,
  remove,
  update,
  removeByid,
  search,
  category,
  buscar,
  getProductsCart,
  Calcular,
  searchProductByName,
};
