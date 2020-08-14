const Model = require('./modelUser');

const addUser = async (newUser) => {
    const myUser = new Model(newUser)
    myUser.password = await myUser.encryptPassword(newUser.password);
    const addUser = myUser.save()
    delete addUser.password;
    return addUser
}

const updateUser = async (id, password, email = undefined, phone = undefined) => {
    const foundUser = await Model.findOne({
        _id: id,
    });
    if (!foundUser) {
        throw (new Error('No Authenticate User'))
    }
    const isAuth = await foundUser.equalPassword(password);
    if (!isAuth) {
        throw (new Error('No Authenticate User'))
    }
    if (email) {
        foundUser.email = email;
    }
    if (phone) {
        foundUser.phone = phone;
    }
    foundUser.dateUpdate = new Date();
    const updateUser = await foundUser.save();
    delete updateUser.password;
    return updateUser;
}

const getUser = async (filter) => {
    const users = await Model.findOne(filter)
    return users
}

const listUsers = async (filter) => {
    const users = await Model.find(filter, { name: 1, email: 1, phone: 1 })
    return users
}

const deleteUser = async (id, password) => {
    const isAuth = await verifyUser(id, password)
    if (!isAuth) {
        throw (new Error('No Authenticate User'))
    }
    await Model.deleteOne({
        _id: id,
    });
}

const verifyUser = async (id, password) => {
    const foundUser = await Model.findOne({
        _id: id,
    });
    if (!foundUser) {
        throw (new Error('No Authenticate User'))
    }
    const isAuth = await foundUser.equalPassword(password);
    return isAuth;
}

module.exports = {
    addUser,
    getUser,
    listUsers,
    updateUser,
    deleteUser,
    verifyUser
}
