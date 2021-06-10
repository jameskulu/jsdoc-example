/**
 * User module - see {@tutorial calculator}
 * @module users
 */

const bcrypt = require('bcryptjs')
const { User } = require('../models')
const { createValidation } = require('../validation/users')

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns {json}
 */
exports.all = async (req, res, next) => {
    try {
        const users = await User.findAll()
        return res.status(200).json({
            success: true,
            message: 'All the available users are fetched.',
            count: users.length,
            data: users,
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
    const { userId } = req.params

    try {
        const singleUser = await User.findByPk(userId)

        if (!singleUser)
            return res.status(404).json({
                success: false,
                message: 'User not found!',
            })

        return res.status(200).json({
            success: true,
            message: 'Single user is fetched.',
            data: singleUser,
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
    const { username, email, password } = req.body

    // Validation
    const { error } = createValidation(req.body)
    if (error)
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        })

    try {
        // Checking if username exists
        const usernameExists = await User.findOne({ where: { username } })

        if (usernameExists)
            return res.status(400).json({
                success: false,
                message: 'Username was already taken.',
            })

        // Checking if email exists
        const emailExists = await User.findOne({ where: { email } })

        if (emailExists)
            return res.status(400).json({
                success: false,
                message: 'Email was already taken.',
            })

        // Generating hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const createdUser = await User.create({
            username,
            email,
            password: hashedPassword
        })
        return res.status(200).json({
            success: true,
            message: 'New user was added.',
            data: createdUser,
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
    const { userId } = req.params
    const { username, email, password, role } = req.body

    try {
        const singleUser = await User.findByPk(userId)

        if (!singleUser)
            return res.status(404).json({
                success: false,
                message: 'User not found!',
            })

        const updatedUser = await User.update(
            { username, email, password, role },
            { where: { id: userId } }
        )
        return res.status(200).json({
            success: true,
            message: 'User was updated.',
            data: updatedUser,
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
    const { userId } = req.params

    try {
        const singleUser = await User.findByPk(userId)

        if (!singleUser)
            return res.status(404).json({
                success: false,
                message: 'User not found!',
            })

        const deletedUser = await User.destroy({
            where: { id: userId },
        })
        return res.status(200).json({
            success: true,
            message: 'User was deleted.',
            data: deletedUser,
        })
    } catch (err) {
        return next(err)
    }
}
