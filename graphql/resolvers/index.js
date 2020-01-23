const cliente = require('./cliente');
const pet = require('./pet');

module.exports = {
  ...cliente,
  ...pet
}