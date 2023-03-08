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
    productos: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }]
  });
  
  const Cart = mongoose.model('Cart', cartSchema);
  
  module.exports = Cart;
  