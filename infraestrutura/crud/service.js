const executaQuery = require('../database/queries')

class Service {
  getAll() {
    const sql = 'SELECT * FROM Servicos'

    return executaQuery(sql)
      .then(services => 
        services.map(service => (
          {
            id: service.id,
            nome: service.nome,
            preco: service.preco,
            descricao: service.descricao,
          }
        ))
      )
  }

  findById(id) {
    const sql = `SELECT * FROM Servicos WHERE id=${parseInt(id)}`

    return executaQuery(sql)
    .then(services => services[0])
  }

  add(item) {
    const { nome, preco, descricao } = item
    const sql = `INSERT INTO Servicos(nome, Preco, Descricao) VALUES('${nome}', ${preco}, '${descricao}')`

    return executaQuery(sql)
      .then(resposta => (
        {
          id: resposta.insertId,
          nome,
          preco,
          descricao
        }
      ))
  }

  update(novoItem) {
    const { id, nome, preco, descricao } = novoItem
    const sql = `UPDATE Servicos SET nome='${nome}', Preco=${preco}, Descricao='${descricao}' WHERE id=${id}`

    return executaQuery(sql)
      .then(() => novoItem)
  }

  delete(id) {
    const sql = `DELETE FROM Servicos WHERE id=${id}`

    return executaQuery(sql)
      .then(() => id)
      .catch(err => console.log(err))
  }
}

module.exports = new Service
