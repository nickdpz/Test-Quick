const storeCategory = require('./store');

const getCategory = (id) => {
    return new Promise(async (resolve, reject) => {
        storeCategory.getCategory(id)
            .then((messages) => {
                resolve(messages)
            })
            .catch(e => {
                reject(e)
            })
    })
}

const getCategories = (filter) => {
    return new Promise(async (resolve, reject) => {
        storeCategory.getCategories(filter)
            .then((messages) => {
                resolve(messages)
            })
            .catch(e => {
                reject(e)
            })
    })
}

const addCategory = (name, shortDescription) => {
    return new Promise(async (resolve, reject) => {
        storeCategory.addCategory({ name, shortDescription })
            .then((messages) => {
                resolve(messages)
            })
            .catch(e => {
                reject(e)
            })
    })
}



module.exports = { getCategories, getCategory, addCategory }