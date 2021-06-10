exports.verifyToken = (req, res, next) => {
    if (!req.headers.authorization)
        return res.status(401).json({
            success: false,
            message: 'Missing Authorization Header',
        })
    const token = req.headers.authorization.split(' ')[1]
    if (!token)
        return res.status(401).json({
            success: false,
            message: 'No authentication token, authorization denied',
        })
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        return next()
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Invalid Token',
        })
    }
}