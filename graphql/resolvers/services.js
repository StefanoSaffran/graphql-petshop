const Operations = require('../../infraestrutura/operations');

const Service = new Operations('service');

const resolvers = {
  Query: {
    services: () => Service.getAll(),
    service:(root, { id }) => Service.findById(id)
  },

  Mutation: {
    addService: (root, params) => Service.add(params),
    updateService: (root, params) => Service.update(params),
    deleteService: (root, { id }) => Service.delete(id),
  }
}

module.exports = resolvers;