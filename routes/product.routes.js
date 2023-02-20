const express = require('express')
const router = express.Router()
const app = express()

const productControllers = require('../controllers/ProductController')
const upload = require('../middleware/upload')
const AuthToken = require('../middleware/AuthToken');
const { route } = require('./ingredients.routes')

router.get('/', productControllers.index);

router.get('/buscar', productControllers.buscar)


// app.use(AuthToken)
// router.get('/',productControllers.index)

/**
 * @swagger
 * /api/product/find/{id}:
 *   get:
 *     summary: obtiene un producto por ID
 *     tags:
 *       - products
 *     description: Devuelve un producto por id.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the product to retrieve.
 *     responses:
 *       '200':
 *         description: A product object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '404':
 *         description: The requested product was not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Product not found with id 123.
 *       '500':
 *         description: An error occurred while retrieving the product.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error retrieving product with id 123.
 */
router.get('/find/:id', productControllers.buscar)

router.get('/search', productControllers.getProductsCart)

/**
 * @swagger
 * /api/product/:
 *   get:
 *     summary: Muestra los productos
 *     tags:
 *       - products
 *     description: Retorna una lista de productos.
 *     responses:
 *       '200':
 *         description: OK.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 products:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 *       '404':
 *         description: NOT FOUND.
 *       '500':
 *         description: Internal Server Error.
 */
router.get('/:key/:value', productControllers.find, productControllers.show)

/**
 * @openapi
 * /api/product/store:
 *   post:
 *     summary: Agrega un producto
 *     tags:
 *       - products
 *     description: Agrega un nuevo producto a la base de datos.
 *     requestBody:
 *       description: Objeto de producto que se agregará a la base de datos.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *       '400':
 *         description: La solicitud no se puede procesar debido a una sintaxis incorrecta.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '500':
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.post('/store', upload.single('image'), productControllers.store)
/**
 * @swagger
 *
 * /api/product/{id}:
 *   put:
 *     summary: Actualiza un producto por su id.
 *     tags:
 *       - products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El id del producto a actualizar.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Campos para actualizar el producto.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               totalCalories:
 *                 type: number
 *               inCart:
 *                 type: string
 *                 enum: [true, false]
 *               status:
 *                 type: string
 *                 enum: [true, false]
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Error en la solicitud.
 *       404:
 *         description: Producto no encontrado con el id especificado.
 *       500:
 *         description: Error del servidor.
 */
router.put('/:id', productControllers.find, productControllers.updateProduct)
router.delete('/:key/:value', productControllers.find, productControllers.remove)

/**
 * @openapi
 * /api/product/{id}:
 *   delete:
 *     summary: Elimina un producto por ID
 *     tags:
 *       - products
 *     description: Elimina un producto de la base de datos utilizando su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del producto a eliminar.
 *         required: true
 *         schema:
 *           type: string
 * 
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito.
 *       '404':
 *         description: Producto no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       '500':
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.delete('/:idproduct', productControllers.removeByid)

// router.get('/search/:name', productControllers.searchProductByName);
// /**
//  * @openapi
//  * /api/product/search/{name}:
//  *   get:
//  *     summary: Busca productos por nombre
//  *     description: Busca productos en la base de datos que coincidan con el patrón de búsqueda proporcionado.
//  *     parameters:
//  *       - in: path
//  *         name: name
//  *         description: Patrón de búsqueda para el nombre del producto.
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       '200':
//  *         description: OK
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/Product'
//  *       '400':
//  *         description: Error al procesar la petición.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Product'
//  *       '500':
//  *         description: Error interno del servidor.
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/Product'
//  */
router.get('/search/:name', productControllers.search)


router.get('/products/category/:query', productControllers.category)


module.exports = router