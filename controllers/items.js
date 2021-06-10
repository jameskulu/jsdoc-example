/**
 * Item module - see {@tutorial calculator}
 * @module items
 */

const { Item } = require('../models')
const { createValidation } = require('../validation/items')

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {json}
 */
exports.all = async (req, res, next) => {
    try {
        const items = await Item.findAll()
        return res.status(200).json({
            success: true,
            message: 'All the available items are fetched.',
            count: items.length,
            data: items,
        })
    } catch (err) {
        return next(err)
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {json}
 */
exports.single = async (req, res, next) => {
    const { itemId } = req.params

    try {
        const singleItem = await Item.findByPk(itemId)

        if (!singleItem)
            return res.status(404).json({
                success: false,
                message: 'Item not found!',
            })

        return res.status(200).json({
            success: true,
            message: 'Single item is fetched.',
            data: singleItem,
        })
    } catch (err) {
        return next(err)
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {json}
 */
exports.create = async (req, res, next) => {
    const { name, description, price, categoryId } = req.body

    // Validation
    const { error } = createValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        const createdService = await Item.create(
            {
                name,
                description,
                price,
                categoryId,
            }
        )
        return res.status(200).json({
            success: true,
            message: 'New item was added.',
            data: createdService,
        })
    } catch (err) {
        return next(err)
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {json}
 */
exports.update = async (req, res, next) => {
    const { itemId } = req.params
    const { name, description, price, categoryId } = req.body

    try {
        const singleItem = await Item.findByPk(itemId)

        if (!singleItem)
            return res.status(404).json({
                success: false,
                message: 'Item not found!',
            })

        const updatedItem = await Item.update(
            { name, description, price, categoryId },
            { where: { id: itemId } }
        )
        return res.status(200).json({
            success: true,
            message: 'Item was updated.',
            data: updatedItem,
        })
    } catch (err) {
        return next(err)
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {json}
 */
exports.remove = async (req, res, next) => {
    const { itemId } = req.params

    try {
        const singleItem = await Item.findByPk(itemId)

        if (!singleItem)
            return res.status(404).json({
                success: false,
                message: 'Item not found!',
            })

        const deletedItem = await Item.destroy({
            where: { id: itemId },
        })
        return res.status(200).json({
            success: true,
            message: 'Item was deleted.',
            data: deletedItem,
        })
    } catch (err) {
        return next(err)
    }
}
