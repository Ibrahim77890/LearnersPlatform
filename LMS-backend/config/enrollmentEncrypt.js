const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');

const generateEnrollmentKey = () => {
  return uuidv4();
};

const encryptKey = (key, secret) => {
  const iv = crypto.randomBytes(16);
  const key_in_bytes = crypto.createHash('sha256').update(String(secret)).digest();
  const cipher = crypto.createCipheriv('aes-256-cbc', key_in_bytes, iv);
  let encrypted = cipher.update(key, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
};

module.exports = { generateEnrollmentKey, encryptKey };
