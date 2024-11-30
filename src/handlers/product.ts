import { Request, Response } from 'express';
import Product from '../models/product.model'

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)
        if (!product) {
            res.status(404).json({
                error: 'Producto No Encontrado'
            })
            return
        }
        res.json({ data: product })
    } catch (error) {
        console.log(error)
    }
}


export const getProduct = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll(
            // {
            //     order: [
            //         ['precio', 'DESC']
            //     ],
            //     attributes: { exclude: ['createdAt', 'updatedAt'] },
            // limit: 1
            // }
        )
        res.json({ data: products })
    } catch (error) {
        console.log(error)
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.create(req.body)
        res.json({ data: product })
    } catch (error) {
        console.log(error)
    }
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