const Model = require('./modelPost');

const addPost = async (query) => {
    const myBuy = new Model(query)
    const res = await myBuy.save();
    return res
}

const getPostByUser = async (query) => {
    const post = await Model.find(query)
    return post
}

const getPostById = async (postId) => {
    const post = await Model.findOne({ _id: postId })
    return post
}

module.exports = {
    addPost,
    getPostByUser,
    getPostById
}
