const express = require('express');
const user = require('../components/user/network')
const category = require('../components/category/network')
const post = require('../components/post/network')
const auth = require('../components/auth/network')

const routes = (server) => {
    server.use('/user', user)
    server.use('/category', category)
    server.use('/post', post)
    server.use('/auth', auth)
}

module.exports = routes