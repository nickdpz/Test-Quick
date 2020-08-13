const Model = require('./modelUser');

const addUser = async (newUser) => {
    const myUser = new Model(newUser)
    myUser.password = await myUser.encryptPassword(newUser.password);
    const addUser = myUser.save()
    return addUser
}

const getUser = async (filter) => {
    const users = await Model.findOne(filter)
    return users
}

const listUsers = async (filter) => {
    const users = await Model.find(filter, { name: 1, email: 1, phone: 1 })
    return users
}

module.exports = {
    addUser,
    getUser,
    listUsers
}
