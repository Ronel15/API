const mongoose =  require ('mongoose')
const Schema  =mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2')


const NutritionTypeSchema = new Schema 
(
    {
        name:
        {
            type:String
        }
    }
,{timestamps:true})
NutritionTypeSchema.plugin(mongoosePaginate)
// const Category = mongoose.model('Category', NutritiontypeSchema);
// module.exports= Category

module.exports = mongoose.model("NutritionType", NutritionTypeSchema)