const router = require('express').Router()
const { verifyToken } = require('../middleware/authentication')
const {
    all,
    single,
    create,
    update,
    remove,
} = require('../controllers/users')

router.get('/', verifyToken, all)

router.get('/:userId', single)

router.post('/new', verifyToken, create)

router.put('/update/:userId', verifyToken, update)

router.delete('/delete/:userId', verifyToken, remove)

module.exports = router
