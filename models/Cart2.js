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


const cartSchema = new Schema({
  Products: [{
    name: String,
    description: String,
    price: Number,
    totalCalories: Number, // agregado
    inCart: Boolean,
    nutrition: Boolean,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subcategory"
    },
    status: Boolean,
    image: String,
    time: Number
  }]
});


const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
