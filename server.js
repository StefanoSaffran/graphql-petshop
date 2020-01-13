const { GraphQLServer } = require('graphql-yoga')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/database/tabelas')
const operations = require('./infraestrutura/operations')

conexao.connect(erro => {
  if (erro) {
    console.log(erro)
  }

  console.log('conectou no banco')

  Tabelas.init(conexao)
})

const Clients = new operations('cliente');
const Pets = new operations('pet');
const resolvers = {
  Query: {
    status: () =>"Server started",
    clients: () => Clients.getAll(),
    client: (root, { id }) => Clients.buscaPorId(id),
    pets: () => Pets.getAll(),
  },
  Mutation: {
    addClient: (root, params) => Clients.add(params),
    updateClient: (root, params) => Clients.update(params),
    deleteClient: (root, { id }) => Clients.delete(id),
    addPet: (root, params) => Pets.add(params)
  }

}

const server = new GraphQLServer({
  resolvers,
  typeDefs: './schema.graphql'
})

server.start(() => console.log("Server ouvindo"))