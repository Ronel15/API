const mongoose = require('mongoose')
const Schema = mongoose.Schema
// const subSchema = require('../models/subschema')

const mongoosePaginate = require('mongoose-paginate-v2');
const Ingredients = require('./Ingredients');

const IngredientSchema = new Schema({
    name: String,
    calories: Number,

});
// const Product2 = mongoose.model('Products2', subSchema)
// module.exports=Product2

const productSchema = new Schema
    (
        {
            name: {
                type: String
            },
            description: {
                type: String
            },
            price: {
                type: Number
            },
            totalCalories:
            {
                type: Number
            },
            inCart:
            {
                type: Boolean, default: false
            },
            category: {
                type: mongoose.Types.ObjectId,
            },
            subcategory: {
                type: mongoose.Types.ObjectId,
                ref: "Subcategory"
            },
            status: {
                type: Boolean, default: true
            },

            image:{
                type:String
            },

            ingredients: [IngredientSchema],


        }, { timestamps: true })

productSchema.methods.calculateTotalCalories = function () {
    this.totalCalories = this.ingredients.reduce((total, ingredient) => total + ingredient.calories, 0);
};

productSchema.methods.setimage = function setimage() {

}
productSchema.plugin(mongoosePaginate)
const Product = mongoose.model('Products', productSchema)
module.exports = Product

