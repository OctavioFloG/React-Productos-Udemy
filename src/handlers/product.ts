import { Request, Response } from 'express';
import Product from '../models/product.model'

export const getProductById = async (req: Request, res: Response) => {
   const { id } = req.params
    const product = await Product.findByPk(id)
    if (!product) {
        res.status(404).json({
            error: 'Producto No Encontrado'
        })
        return
    }
}


export const getProduct = async (req: Request, res: Response) => {
    const products = await Product.findAll(
        {
            order: [
                ['precio', 'DESC']
            ]
        })
        res.json({ data: products })
}

export const createProduct = async (req: Request, res: Response) => {
    const product = await Product.create(req.body)
        res.json(201).json({data: product})
}

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        res.status(404).json({
            error: 'Producto No Encontrado'
        })
        return
    }

    //Actualiza
    await product.update(req.body)
    await product.save()

    res.json({ data: product })
}

export const updateAvailability = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        res.status(404).json({
            error: 'Producto No Encontrado'
        })
        return
    }

    //Actualizar
    product.availability = !product.dataValues.availability
    await product.save()

    res.json({ data: product })
}

export const deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if (!product) {
        res.status(404).json({
            error: 'Producto No Encontrado'
        })
        return
    }
    await product.destroy()
    res.json({data:'Producto eliminado'})
}