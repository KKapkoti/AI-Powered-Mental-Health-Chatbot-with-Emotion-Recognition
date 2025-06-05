// models/Posts.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  postText: { 
    type: String, 
    required: true 
  },
  author: {
    id: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true ,
    },
    name: { 
      type: String, 
      required: true 
    },
  },
}, { timestamps: true }); // optional: adds createdAt/updatedAt

module.exports = mongoose.model('Post', postSchema);

