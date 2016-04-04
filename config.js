var cfg = {};
cfg.twilio = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  from: process.env.TWILIO_FROM
};

cfg.myPhone = process.env.MY_PHONE;

cfg.hostname = 'localhost';
cfg.port = 3000;

module.exports = cfg;
