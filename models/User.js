const mongoose  = require('mongoose')
const Schema    =mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({

    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    role:{
        type:String,
        default:'regular',
        enum:[
            'regular',
            'admin'
        ]
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
},{timestamps:true}) 
userSchema.pre('save', function(next){
    bcrypt.genSalt(10).then(salts=>{
        bcrypt.hash(this.password,salts).then(hash =>{
            this.password=hash;
            next();
        }).catch(error=>next(error))
    }).catch(error=>next(error))
})
const User = mongoose.model('Users', userSchema)
module.exports=User