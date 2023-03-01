const express = require('express')
const router = express.Router()
const app = express()

const CategoryController  = require('../controllers/CategoryController')
const upload = require('../middleware/upload')



// app.use(AuthToken)
router.get('/',CategoryController.index)
router.post('/store',CategoryController.store)
router.get('/find/:id',CategoryController.getById)





module.exports=router