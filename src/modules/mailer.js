const nodemailer = require('nodemailer');
const mailConfig = require('../config/mail.json');

const { host, port, user, pass } = mailConfig;

const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass }
});

module.exports = transport;