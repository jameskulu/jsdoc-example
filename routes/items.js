const router = require('express').Router()
const { verifyToken } = require('../middleware/authentication')

const {
    all,
    single,
    create,
    update,
    remove,
} = require('../controllers/items')

router.get('/', verifyToken, all)

router.get('/:itemId', verifyToken, single)

router.post('/new', verifyToken, create)

router.put('/update/:itemId', verifyToken, update)

router.delete('/delete/:itemId', verifyToken, remove)

module.exports = router
