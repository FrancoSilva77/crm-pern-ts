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
