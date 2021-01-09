const mongoose = require('../../database/index.js');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: false },
  email: { type: String, unique: true, required: true, lowercase: true },
  password: { type: String, required: true, select: false },
  passwordResetToken: { type: String, select: false },
  passwordResetExpires: { type: Date, select: false },
  perfilType: { type: String },
  createAt: { type: Date, default: Date.now }

});

// "pre" quer dizer que será executado antes de salvar no banco
UserSchema.pre('save', async function (next) {
  // this se refere ao objeto que está sendo gravado no banco
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

const User = mongoose.model('User', UserSchema);

module.exports = User;