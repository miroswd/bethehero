const crypto = require('crypto'); // Gerar string aleatória

module.exports = function generateUniqueId(){
  return crypto.randomBytes(4).toString('HEX');
}