const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const cartSchema = new mongoose.Schema({
//     products: [
//       {
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: 'Product',
//           required: true,
//         },
//         quantity: {
//           type: Number,
//           required: true,
//           default: 1,
//         },
//       },
//     ],
//   });
  

// const Cart = mongoose.model('Cart', cartSchema);

// module.exports = Cart;


// const cartSchema = new mongoose.Schema({
//   Products: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Products'
//   }]
// });
const cartSchema = new Schema({
  productos: [{
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    },
    name: String,
    description: String,
    price: Number,
    image: String,
    totalCalories: Number,
    nutrition: Boolean,
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    subcategory: {
      type: Schema.Types.ObjectId,
      ref: 'Subcategory'
    },
    ingredients: [{
      value: String,
      name: String,
      calories: Number,
      unidad: String,
      weight: String
    }],
    cantidad: {
      type: Number,
      default: 1
    }
  }]
}, {
  timestamps: true
});


const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
