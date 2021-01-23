const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String
    },
    tokens: Array,
});

userSchema.methods.toJSON = function () {
    var user = this.toObject();
    delete user.password;
    // delete user.tokens;
    return user;
}


userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);

    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;