const { response } = require("express");
const Product = require("../models/Product");
const Category = require("../models/Category")

const index = (req, res, next) => {
  const limit = parseInt(req.query.limit, 10) || 5;
  const page = parseInt(req.query.page, 10) || 1;

  Category.paginate({}, { limit, page })
    .then((response) => {
      res.json(response);
    })
    .catch((error) => {
      res.json({
        message: "Error",
      });
    });
};


const show = (req, res) => {
  if (req.body.error) return res.status(500).send({ error });
  if (!req.body.products) return res.status(404).send({ message: "NOT FOUND" });
  let products = req.body.products;
  return res.status(200).send({ products });
};
//add  new product
const store = (req, res, next) => {
  let name = req.body

  Category.findOne(name)
  .then(product=>{
    if(!product)
    {
      let category = new Category({
        name: req.body.name,
      });
      // if (req.file) {
      //   product.image = req.file.path;
      // }
      category
        .save()
        .then((response) => {
          res.json({
            message: "Category Added Succesfully",
          });
        })
        .catch((error) => {
          res.json({
            message: "An error ocurrred",
          });
        });
    }
    else{
      res.json({
        message:"La categoria ya existe"
      })
    }
  })

};

const update = (req, res) => {
  if (req.body.error) return res.status(500).send({ error });
  if (!req.body.products) return res.status(404).send({ message: "NOT FOUND" });
  let product = req.body.products[0];
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

const removeByid = async(req, res) => {
  const {idproduct} = req.params;
  await Product.findByIdAndDelete(idproduct);
  res.json("producto elimininado")
};
const find = (req, res, next) => {
  let query = {};
  query[req.params.key] = new RegExp (req.params.value, 'i');
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

const search=async(req, res, next)=>{
  try {
    const products = await Product.find(
      {
        name:new RegExp(req.params.query, 'i'),
        
      }
    );
    res.json(products);
  } catch (error) {
    res.status(400).json({message:'Error al procesar la peticion'})
  }
}
const category=async(req, res, next)=>{
  try {
    const products = await Product.find(
      {
        category:new RegExp(req.params.query, 'i'),
        
      }
    );
    if(products=="")
    {
      res.json('No hay productos')
    }
    else{

      res.json(products);
    }
  } catch (error) {
    res.status(400).json({message:'Error al procesar la peticion'})
  }
}

const getById = async (req, res) => {
  Category.findById(req.params.id)
    .then(category => {
      if (!category) {
        return res.status(404).send({
          message: "Product not found with id " + req.params.id
        });
      }
      res.send(category);
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
module.exports = {
  index,
  show,
  store,
  find,
  remove,
  update,
  removeByid,
  getById

};
