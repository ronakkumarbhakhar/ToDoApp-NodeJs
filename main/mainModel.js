const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: String, // String is shorthand for {type: String}
    author:{ type: mongoose.Schema.Types.ObjectId,
      ref: 'user'},
    body: String,
    startDate: { type: Date, default: Date.now },
    enddate:{type:Date,default: null},
    status:{type:Boolean,default:false}
  });

  exports.task = mongoose.model('tasks',blogSchema);