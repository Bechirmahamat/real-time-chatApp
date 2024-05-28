import User from './../models/user.model.js'
import CustomAPIError from './../errors/customError.js'

export const login = async (req, res) => {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    if (!user) throw new CustomAPIError('Username or password incorrect')
    const isCorrectPwt = await user.comparePWD(password)
    if (!isCorrectPwt)
        throw new CustomAPIError('Username or password incorrect')
    const token = await user.createTOKEN()
    user.tokens.push(token)
    user.save()
    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true, // prevent XSS attacks cross-site scripting attack
        sameSite: 'strict', //CSRF attack cross site request forgery attacks
        secure: process.env.NODE_ENV !== 'development',
    })
    res.status(200).json({
        _id: user._id,
        username: user.username,
        fullName: user.fullName,
        avatar: user.avatar,
        joinAt: user.createdAt,
        token: token,
    })
}
export const signup = async (req, res) => {
    const { username, gender } = req.body
    // console.log(req)
    const avatar = `https://avatar.iran.liara.run/public/${
        gender === 'female' ? 'girl' : 'boy'
    }?username=${username}`

    const user = await User.create({ ...req.body, avatar })
    const token = await user.createTOKEN()

    user.tokens.push(token)
    user.save()
    res.cookie('jwt', token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true, // prevent XSS attacks cross-site scripting attack
        sameSite: 'strict', //CSRF attack cross site request forgery attacks
        secure: process.env.NODE_ENV !== 'development',
    })
    res.status(200).json({
        _id: user._id,
        username: user.username,
        gender: user.gender,
        avatar: user.avatar,
        fullName: user.fullName,
        joinAt: user.createdAt,
        token: token,
    })
}
export const logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 0 })
    res.status(200).json({ msg: 'logout successfully' })
}
