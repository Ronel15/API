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


const cartSchema = new mongoose.Schema({
  Products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products'
  }]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
