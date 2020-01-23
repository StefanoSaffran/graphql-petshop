const operations = require('../../infraestrutura/operations')

const Clients = new operations('cliente');

const resolvers = {
  Query: {
    clients: () => Clients.getAll(),
    client: (root, { id }) => Clients.findById(id),
  },
  Mutation: {
    addClient: (root, params) => Clients.add(params),
    updateClient: (root, params) => Clients.update(params),
    deleteClient: (root, { id }) => Clients.delete(id),
  }

}

module.exports = resolvers;