const { userService } = require('../services');
const tokenGenerator = require('./token/tokenGenerator');

const listUsers = async (_req, res) => {
    const users = await userService.getUsers();
 res.status(200).json(users);
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    const users = await userService.getById(id);
    if (!users) {
        return res.status(404).json({ message: 'User does not exist' });
    }
 res.status(200).json(users);
};

const registerUser = async (req, res) => {
        const emailValidation = /\S+@\S+\.\S+/;
        const { displayName, email, password } = req.body;
        if (displayName.length < 8) {
            return res.status(400).json( 
                { message: '"displayName" length must be at least 8 characters long' },
                );
        }
        if (password.length < 6) {
            return res.status(400).json( 
                { message: '"password" length must be at least 6 characters long' },
                );
        }
        const exists = await userService.getByEmail(email);
        if (exists) {
            return res.status(409).json({ message: 'User already registered' });
        }
        if (!emailValidation.test(email)) {
            return res.status(400).json({ message: '"email" must be a valid email' });
        }
            const newUser = await userService.createUser(displayName, email, password);

            const token = tokenGenerator(newUser);
            return res.status(201).json({ token });
};
// const deleteUser = async (req, res) => {
//     try {const { id } = req.user
//     await userService.deleted(id)
// res.status(204).end();
// }catch (error) {
//     res.status(500).json({message: error.message})
// }
// }
module.exports = {
    listUsers,
    getUserById,
    registerUser,
    // deleteUser,
};