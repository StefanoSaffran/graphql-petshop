const cruds = require('./crud/index');

class Operations {
  constructor(entidade) {
    this._entidade = entidade;
  }

  getAll() {
    return cruds[this._entidade].getAll();
  }

  findById(id) {
    return cruds[this._entidade].findById(id);
  }

  add(item) {
    return cruds[this._entidade].add(item);

  }

  update(novoItem, id) {
    return cruds[this._entidade].update(novoItem, id);
  }

  delete(id) {
    return cruds[this._entidade].delete(id);
  }
}

module.exports = Operations;
