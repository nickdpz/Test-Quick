const { Schema, model } = require('mongoose');


const postSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    category: [{
        type: Schema.ObjectId,
        ref: 'Category',
    }],
    title: { type: String, required: true },
    dateUpdate: { type: Date },
    dateCreate: { type: Date, default: Date.now },
    slug: { type: String, required: true },
    description: { type: String, required: true },
    shortDescription: { type: String, required: true },

});

module.exports = model('Post', postSchema);