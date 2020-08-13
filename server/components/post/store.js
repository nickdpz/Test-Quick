const Model = require('./modelPost');

const addPost = async (query) => {
    const myBuy = new Model(query)
    const res = await myBuy.save();
    return res
}

const getPostByUser = async (query) => {
    const buys = await Model.find(query)
    return buys
}

module.exports = {
    addPost,
    getPostByUser,
}
