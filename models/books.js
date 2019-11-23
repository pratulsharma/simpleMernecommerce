const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const author = new Schema({
    name: String
})

const books = new Schema({
  description:  String,
  pages: String,
  writer: Object
});



module.exports = mongoose.model("booksmodel", books)