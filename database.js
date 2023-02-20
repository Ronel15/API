// const mongoose = require('mongoose')
import mongoose from "mongoose"

(async ()=>{
    const db = await mongoose.connect('mongodb://localhost:27017/pruebaM')
    console.log(db.connecction.name)
})()