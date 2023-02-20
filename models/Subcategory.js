const mongoose =  require ('mongoose')
const Schema  =mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')


const SubcategorieSchema = new Schema 
(
    {
        name:
        {
            type:String
        },
        category:
        {
            type: mongoose.Types.ObjectId,
            ref:"Category"
        }
    }
)
SubcategorieSchema.plugin(mongoosePaginate)
const Subcategory = mongoose.model('Subcategory', SubcategorieSchema);
module.exports= Subcategory

