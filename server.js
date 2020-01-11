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
const resolvers = {
  Query: {
    status: () =>
      "Server started",
    clientes: () => Clients.lista(),
  },
  Mutation: {
    addClient: (root, params) =>
      Clients.adiciona(params)
  }

}

const server = new GraphQLServer({
  resolvers,
  typeDefs: './schema.graphql'
})

server.start(() => console.log("Server ouvindo"))