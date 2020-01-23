const Operations = require('../../infraestrutura/operations')

const Pets = new Operations('pet');

const resolvers = {
  Query: {
    pets: () => Pets.getAll(),
    pet:(root, { id }) => Pets.findById(id)
  },
  Mutation: {
    addPet: (root, params) => Pets.add(params),
    updatePet: (root, params) => Pets.update(params),
    deletePet: (root, { id }) => Pets.delete(id),
  }

}

module.exports = resolvers;