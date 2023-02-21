const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const PORT = process.env.PORT || 3050
//meta data
const options = {
    definition: {
        openapi: "3.0.0",
        info: { title: 'API_Food3', version: '1.0.0' },
        tags: [
            {
                name: "products",
                description: "API para products"
            },
            {
                name: "ingredients",
                description: "API para ingredients"
            }
        ],
        components: {
            schemas: {
                Product: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', example: 'Ensalada con pera' },
                        description: { type: 'string', example: 'Ensalada con peras frescas' },
                        price: { type: 'number', example: '90' },
                        totalCalories: { type: 'number', example: '12' },
                        inCart: { type: 'boolean' },
                        status: { type: 'boolean' },
                    }
                },
                Ingredient: {
                    type: 'object',
                    properties: {
                        name: { type: 'string', example: 'Res' },
                        familia: { type: 'string', example: 'Animal' },
                        calories: { type: 'number', example: '30' },
                        status: { type: 'boolean' },
                    }
                }
            }
        }
    },
    apis: ['./routes/product.routes.js', './routes/ingredients.routes.js']
}
//Docs en Json
const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app, port) => {
    app.use('/api/product/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/api/product/docs.json', (req, res) => {
        res.setHeader('content-Type', 'application/json');
        res.send(swaggerSpec)
    })

    console.log(`version 1 Docs http://localhost:${PORT}/api-docs/#/`);

}
module.exports = { swaggerDocs };