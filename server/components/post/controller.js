const storeUser = require('../user/store');
const storePost = require('./store');

const addPost = (user, title, slug, description, shortDescription, category) => {
    return new Promise(async (resolve, reject) => {
        const newPost = {
            user,
            title,
            slug,
            description,
            shortDescription,
            category,
            dateUpdate: new Date(),
            dateCreate: new Date(),
        }
        try {
            const post = await storePost.addPost(newPost);
            resolve(post);
        } catch (e) {
            reject(e);
        }
    })
}

const getPost = (userId) => {
    return new Promise(async (resolve, reject) => {
        let filter;
        if (userId) {
            filter = { user: userId }
        } else {
            filter = {}
        }
        storePost.getPostByUser(filter)
            .then((messages) => {
                resolve(messages)
            })
            .catch(e => {
                reject(e)
            })
    })
}

const getPostId = (postId) => {
    return new Promise(async (resolve, reject) => {
        storePost.getPostById(postId)
            .then((messages) => {
                resolve(messages)
            })
            .catch(e => {
                reject(e)
            })
    })
}

const deletePost = (userId, userPass, postId) => {
    return new Promise(async (resolve, reject) => {
        const user = await storeUser.verifyUser(userId, userPass);
        if (!user) {
            reject(new Error("No Authenticate"))
        }
        storePost.deletePost(postId)
            .then((messages) => {
                resolve(messages)
            })
            .catch(e => {
                reject(e)
            })
    })
}

module.exports = { addPost, getPost, getPostId, deletePost }