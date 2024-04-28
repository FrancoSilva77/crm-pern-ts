import { Request, Response } from 'express';
import Sale from '../models/Sale.model';
import Product from '../models/Product.model';
import SaleProducts from '../models/SaleProducts.model';

export const getSales = async (req: Request, res: Response) => {
  const sales = await Sale.findAll({
    include: [
      {
        model: SaleProducts,
        include: [
          {
            model: Product,
          },
        ],
      },
    ],
  });

  return res.json({ data: sales });
};

export const saveSale = async (req: Request, res: Response) => {
  // const { total, sale } = req.body;

  const newSale = await Sale.create(req.body);
  // res.status(201).json({ data: newSale });

  // Obtener el id de la venta
  const id = newSale.id;

  // Obtener los productos
  const products = JSON.parse(req.body.sale);

  // Formatear un arreglo
  const saleProduct = [];

  products.forEach((product) => {
    const saleProductData = {
      sale_id: id,
      product_id: product.id,
      quantity: product.quantity,
    };

    saleProduct.push(saleProductData);
  });

  // Almacenar en la base de datos
  await SaleProducts.bulkCreate(saleProduct);
};
