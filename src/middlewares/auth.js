const jwt = require('jsonwebtoken')
const User = require('../models/user')

const isAuthenticated = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('Unauthenticated')
    }

    const token = await authHeader.split(" ")[1]

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded) {
            throw new Error('Invalid Request')
        }

        req.user = {
            userId: decoded.userId,
        }

        next();
    } catch (error) {
        // throw new Error('Authentication failed')
        res.status(403).json({ message: 'Unauthenticated' })
    }
}

module.exports = isAuthenticated