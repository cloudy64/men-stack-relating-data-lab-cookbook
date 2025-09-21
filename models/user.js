const mongoose = require('mongoose');


const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

});


//this is for databse this schemas will be inDB
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  pantry:{
    Type:[foodSchema]
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
