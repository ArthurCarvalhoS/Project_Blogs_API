const { userService } = require("../services");
const tokenGenerator = require('./token/tokenGenerator');

module.exports = async (req, res) => {
    try {
        const emailValidation = /\S+@\S+\.\S+/;
        const { displayName, email, password } = req.body;
        if(displayName.length < 8) {
            return res.status(400).json({ message: '"displayName" length must be at least 8 characters long'})
        }
        if(password.length < 6) {
            return res.status(400).json({ message: '"password" length must be at least 6 characters long'})
        }
        const exists = await userService.getByEmail(email);
        if(exists){
            return res.status(409).json({ message: 'User already registered'})
        }
        if(!emailValidation.test(email)){
            return res.status(400).json({ message: '"email" must be a valid email'})
        }
            const newUser = await userService.createUser(displayName, email, password)

            const token = tokenGenerator(newUser)
            return res.status(201).json({ token });
    
      } catch (err) {
        res
          .status(500)
          .json({ message: 'Erro ao salvar o usuário no banco', error: err.message });
      }
}