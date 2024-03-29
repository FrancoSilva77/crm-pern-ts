import { Request, Response } from 'express';
import Product from '../models/Product.model';

export const createProduct = async (req: Request, res: Response) => {
  // * Forma 1 - Guardar
  // const product = new Product(req.body);
  // const savedProduct = await product.save();

  // * Forma 2 - Guardar
  try {
    const product = await Product.create(req.body);
    res.json({ data: product });
  } catch (error) {
    console.log(error);
  }
};
