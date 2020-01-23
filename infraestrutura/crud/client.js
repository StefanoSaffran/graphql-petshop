const executaQuery = require('../database/queries')

class Client {
  getAll() {
    const sql = 'SELECT * FROM Clientes; SELECT * FROM Pets'

    return executaQuery(sql)
      .then(data => {
        const clients = data[0]
        const pets = data[1]

        return clients.map(client => {
          const petsClient = pets.filter(pet => pet.donoId === client.id)

          return ({
            ...client,
            pets: petsClient
          })
        })
      })
  }

  findById(id) {
    const sql = `SELECT * FROM Clientes WHERE id=${id}; SELECT * FROM Pets WHERE donoId = ${id}`

    return executaQuery(sql)
      .then(data => {
        const client = data[0][0]
        const pets = data[1]

        return ({
          ...client,
          pets
        })
      })
  }

  add(item) {
    const { nome, cpf } = item
    const sql = `INSERT INTO Clientes(nome, CPF) VALUES('${nome}', '${cpf}')`

    return executaQuery(sql)
      .then(resposta => (
        {
          id: resposta.insertId,
          nome,
          cpf
        }
      ))
  }

  update(novoItem) {
    const { id, nome, cpf } = novoItem
    const sql = `UPDATE Clientes SET nome='${nome}', CPF='${cpf}' WHERE id=${id}`

    return executaQuery(sql)
      .then(() => novoItem)
  }

  delete(id) {
    const sql = `DELETE FROM Clientes WHERE id=${id}`

    return executaQuery(sql)
      .then(() => id)
      .catch(err => err.message)
  }
}

module.exports = new Client
