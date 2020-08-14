const storeUser = require('./store');

const addUser = async (name, email, password, phone = undefined) => {
    let addUser = {}
    addUser = {
        'name': name,
        'email': email,
        'password': password,
        'role': 'customer',
        'phone': phone,
        'dateCreate': new Date(),
        'dateUpdate': new Date(),
    }
    try {
        let newUser = await storeUser.addUser(addUser);
        delete newUser.password;
        return (newUser);
    } catch (e) {
        throw (e)
    }
}

const updateUser = async (id, password, email, phone = undefined) => {
    try {
        let newUser = await storeUser.updateUser(id, password, email, phone);
        return ({ id: newUser._id, name: newUser.name, email: newUser.email, phone: newUser.phone, dateUpdate: newUser.dateUpdate });
    } catch (e) {
        throw (e)
    }
}

const getUser = async (filterUser) => {
    try {
        const messages = await storeUser.getUser(filterUser)
        return (messages)
    } catch (e) {
        throw (e)
    }
}

const getUsers = async (filterUser) => {
    try {
        const messages = await storeUser.listUsers(filterUser)
        return (messages)
    } catch (e) {
        throw (e)
    }
}


module.exports = { getUsers, addUser, getUser, updateUser }