const Operations = require('../../infraestrutura/operations');

const CustomerService = new Operations('customerService');

const resolvers = {
  Query: {
    customerServices: () => CustomerService.getAll(),
    customerService:(root, { id }) => CustomerService.findById(id)
  },

  Mutation: {
    addCustomerService: (root, params) => CustomerService.add(params),
    updateCustomerService: (root, params) => CustomerService.update(params),
    deleteCustomerService: (root, { id }) => CustomerService.delete(id),
  }
}

module.exports = resolvers;