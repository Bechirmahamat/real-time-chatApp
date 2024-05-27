import User from './../models/user.model.js'
export const getUsers = async (req, res) => {
    const currentUser = req.user.userId
    const users = await User.find({ _id: { $ne: currentUser } }).select(
        '_id username fullName avatar'
    )
    res.status(200).json(users)
}
