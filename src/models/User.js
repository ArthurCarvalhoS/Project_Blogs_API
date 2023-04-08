const UserModel = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: DataTypes.INTERGER,
        display_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        image: DataTypes.STRING
    })
    return User;
}

module.exports = UserModel;