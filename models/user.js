const { Schema, model } = require('mongoose');
const { randomBytes, createHmac } = require('crypto');

const userSchmema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true
  },
  profileImageURL: {
    type: String,
    default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  },
  role: {
    type: String,
    enum: ['ADMIN', 'USER'],
    default: 'USER'
  }
}, { timestamps: true })

userSchmema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  const salt = randomBytes(16).toString();
  const hashedPassword = createHmac('sha256', salt).update(user.password).digest('hex');

this.salt = salt;
this.password = hashedPassword;
next();
})

const User = model("User", userSchmema);

module.exports = User;