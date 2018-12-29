const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var questionSchema = new Schema({
  number: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true,
    default: 'Multiple choice'
  },
  difficulty: {
    type: String,
    required: true.
    default: 'Easy'
  },
  content: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

var Questions = mongoose.model('Questions', questionSchema);
module.exports = Questions;
