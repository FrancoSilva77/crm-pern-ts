import { Router } from 'express';
import { body, param } from 'express-validator';
import { getProducts, createProduct, getProductById } from './handlers/product';
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

router.put('/', (req, res) => {
  res.json('DESDE PUT');
});

router.patch('/', (req, res) => {
  res.json('DESDE PATCH');
});

router.delete('/', (req, res) => {
  res.json('DESDE DELETE');
});

export default router;
