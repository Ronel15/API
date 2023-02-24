const app = require('./app');
const cors = require('cors');
// const db = require('./database/db');

const {swaggerDocs: V1SwaggerDocs} = require('./swagger')
const PORT = process.env.PORT || 3050;
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

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
    V1SwaggerDocs(app, PORT);
    
});
