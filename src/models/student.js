const mongoose = require('mongoose');
const validator = require('validator');

const studentSchama = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'Email id is alredy avelable'],
    validator(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Invalid Email');
      }
    },
  },
  phone: {
    type: Number,
    min: 10,

    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
});

//we will creatre a new collections

const Student = new mongoose.model('Student', studentSchama);

module.exports = Student;
