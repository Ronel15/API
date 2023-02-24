const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const ProductRoute = require('./routes/product.routes');
const UserRoute = require('./routes/user.routes');
const AuthRoute = require('./routes/auth.routes');
const IngredientsRoute = require('./routes/ingredients.routes');
const CategoryRoute = require('./routes/Category.routes');
const SubcategoryRoute = require('./routes/Subcategory.routes');
const NutritionRoute = require('./routes/Nutrition.routes');
const CartRoute = require('./routes/Cart.routes');
const AuthToken = require('./middleware/AuthToken');
const CaloriesRoute = require('./routes/Calories.routes');
const { swaggerDocs: V1SwaggerDocs } = require('./swagger');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

const app = express();

app.use(cors());
// CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
      return res.status(200).json({});
    }
  
    next();
  });
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));

// Configuración de rutas
app.use('/auth', AuthRoute);
app.use('/api/product', ProductRoute);
app.use('/user', UserRoute);
app.use('/ingredients/add', IngredientsRoute);
app.use('/category/add', CategoryRoute);
app.use('/subcategory/add', SubcategoryRoute);
app.use('/nutrition/add', NutritionRoute);
app.use('/cart', CartRoute);
app.use('/calculateCalories', CaloriesRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));

module.exports = app;
