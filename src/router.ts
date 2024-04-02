import { Router } from 'express';
import { body, param } from 'express-validator';
import {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  updateAvailability,
  deleteProduct,
} from './handlers/product';
import { handleInputErrors } from './middleware';

const router = Router();
/**
 * @swagger
 * components:
 *  schemas:
 *    Product:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: The Product ID
 *          example: 1
 *        name:
 *          type: string
 *          description: The Product name
 *          example: Tablet 10 pulgadas
 *        price:
 *          type: number
 *          description: The Product price
 *          example: 200
 *        availability:
 *          type: boolean
 *          description: The Product availability
 *          example: true
 */

/**
 * @swagger
 * /api/products:
 *  get:
 *    summary: Get a list of products
 *    tags:
 *      - Products
 *    description: Return a list of products
 *    responses:
 *      200:
 *        description: Success for response
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Product'
 *
 */

// Routing
router.get('/', getProducts);
router.get(
  '/:id',
  param('id').isInt().withMessage('ID no Válido'),
  handleInputErrors,
  getProductById
);

router.post(
  '/',
  // Validación
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('price')
    .isNumeric()
    .withMessage('Valor no válido')
    .notEmpty()
    .withMessage('El precio es obligatorio')
    .custom((value) => value > 0)
    .withMessage('El precio no es válido'),
  handleInputErrors,
  createProduct
);

router.put(
  '/:id',
  // Validación
  param('id').isInt().withMessage('ID no Válido'),
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('price')
    .isNumeric()
    .withMessage('Valor no válido')
    .notEmpty()
    .withMessage('El precio es obligatorio')
    .custom((value) => value > 0)
    .withMessage('El precio no es válido'),
  body('availability')
    .isBoolean()
    .withMessage('Valor para disponibilidad no válido'),
  handleInputErrors,
  updateProduct
);

router.patch(
  '/:id',
  param('id').isInt().withMessage('ID no Válido'),
  handleInputErrors,
  updateAvailability
);

router.delete(
  '/:id',
  param('id').isInt().withMessage('ID no Válido'),
  handleInputErrors,
  deleteProduct
);

export default router;
