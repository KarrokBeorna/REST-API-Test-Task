const jwt = require('jsonwebtoken')
const {User} = require('./models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '1h'}
    )
}

class UserController {
    async create_user(req, res) {
        const {email, password, role} = req.body
        if (!email || !password) {
            return res.status(404).json({message: 'Заполните все поля'})
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            return res.status(404).json({message: 'Пользователь с таким email уже существует'})
        }
        const new_user = await User.create({email, role, password})
        const token = generateJwt(new_user.id, new_user.email, new_user.role)
        return res.json({token})
    }

    async login(req, res) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return res.status(404).json({message: 'Пользователя с таким email не существует'})
        }
        if (!(password === user.password)) {
            return res.status(500).json({message: 'Неверный пароль'})
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }

    async check(req, res) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()