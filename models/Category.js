const mongoose =  require ('mongoose')
const Schema  =mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')


const CategorieSchema = new Schema 
(
    {
        name:
        {
            type:String
        }
    }

,{timestamps:true})
CategorieSchema.plugin(mongoosePaginate)
// const Category = mongoose.model('Category', CategorieSchema);
// module.exports= Category

module.exports = mongoose.model("Category", CategorieSchema)