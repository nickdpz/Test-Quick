const Model = require('./modelCategory');

const getCategory = async (id) => {
    const product = await Model.findOne({ _id: id })
    return product
}

const getCategories = async () => {
    const product = await Model.find({})
    return product
}

const addCategory = async (newNode) => {
    const myProduct= new Model(newNode);
    const add = await myProduct.save();
    return add
}

module.exports = {
    getCategory,
    getCategories,
    addCategory
}
