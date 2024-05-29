import jwt from 'jsonwebtoken'
import CustomAPIError from './../errors/customError.js'

export const protectedRoute = (req, res, next) => {
    try {
        const token = req.cookies.jwt
        if (!token) {
            throw new CustomAPIError('Unauthorized -No Token Provided', 401)
        }
        const decoded = jwt.verify(token, process.env.JWT_TOKEN_SECRET_KEY)
        if (!decoded) {
            throw new CustomAPIError('Authentication Invalid token', 401)
        }
        const { userId, username } = decoded
        // console.log(decoded)
        req.user = { userId, username }
        next()
    } catch (error) {
        throw new CustomAPIError('Authentication Invalid', 401)
    }
}
