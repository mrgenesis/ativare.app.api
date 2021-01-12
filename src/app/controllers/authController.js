const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth-config');
const mailer = require('../../modules/mailer');

const User = require('../models/user');

function generateToken(param = {}) {
  return jwt.sign(param, authConfig.secret, { expiresIn: 86400 });
}

router.get('/', async (req, res) => {

  try {
    const users = await User.find({});

    if (!users)
      return res.status(204).send([]);

    res.send([...users]);

  } catch (err) {
    console.log(err);
    res.status(400).send({ Error: "error" });
  }
});

router.post('/register', async (req, res) => {
  const { email } = req.body;

  try {

    // Caso o usuário já exista, interrompe e informa o erro
    if (await User.findOne({ email })) {
      return res.status(400).send({ Error: "User already exists" });
    }

    const user = await User.create(req.body);

    // evita enviar senha para o front-end
    user.password = null;

    return res.send({
      user,
      token: generateToken({ id: user.id })
    });

  } catch (err) {
    res.status(400).send({ Error: 'Registration failed' });
    console.log(err);
  }
});

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    console.error('Usuário não existe.');
    return res.status(401).send({});
  }
  if (!await bcrypt.compare(password, user.password)) {
    console.error('Senha errada.');
    return res.status(401).send({});
  }

  user.password = null;

  //const token = jwt.sign({ id: user.id }, authConfig.secret, { expiresIn: 86400 });
  res.status(200).send({
    user,
    authorization: generateToken({ id: user.id, perfilType: user.perfilType })
  });

});

router.post('/forgot_password', async (req, res) => {
  const { email } = req.body;
  console.log(email);

  try {
    const user = await User.findOne({ email });

    if (!user)
      res.status(400).send({ Error: 'User not found' });

    const token = crypto.randomBytes(20).toString('hex');

    const now = new Date();
    now.setHours(now.getHours() + 1);


    await User.findByIdAndUpdate(user.id, {
      '$set': {
        passwordResetToken: token,
        passwordResetExpires: now
      }
    });
    const info = await mailer.sendMail({
      to: email,
      from: 'mrgenesis@hotmail.cm',
      subject: "Your Password Reset Token",
      text: token
    });

    //console.log("Message sent: %s", info.messageId);

  } catch (err) {
    res.status(400).send({ Error: 'Erro on forgot password, try again' });
  }
});

router.post('/reset_password', async (req, res) => {
  const { email, token, password } = req.body;

  try {
    const user = await User.findOne({ email })
      .select('+passwordResetToken passwordResetExpires');

    if (!user)
      return res.status(400).send({ Error: "User not found" });

    if (token !== user.passwordResetToken)
      return res.status(400).send({ Error: "Token invalid" });
    if (Date() > user.passwordResetExpires)
      return res.status(400).send({ Error: "Token expires, try again" });

    user.password = password;
    await user.save();
    res.send();

  } catch (err) {
    console.log(err);
    res.status(400).send({ Error: "Can not reset, try again" });
  }
});
router.get('/:userCode', async (req, res) => {
  const { userCode } = req.params;

  try {
    const user = await User.findOne({ code: userCode });
    if (!user)
      return res.status(204).send({});

    res.send({ ...user.toObject() });

  } catch (err) {
    console.log(err);
    res.status(400).send({ Error: "error" });
  }
});

module.exports = app => app.use('/auth', router);