const executaQuery = require('../database/queries')

class CustomerService {
  getAll() {
    const sql = `SELECT Atendimentos.id, Atendimentos.data, Atendimentos.status, Atendimentos.observacoes, 
    Pets.id as petId, Pets.nome as petNome, Pets.tipo as petTipo, Pets.observacoes as petObservacoes, 
    Clientes.id as clienteId, Clientes.nome as clienteNome, Clientes.cpf as clienteCpf, Servicos.id as servicoId, 
    Servicos.nome as servicoNome, Servicos.preco as servicoPreco, Servicos.descricao as servicoDescricao FROM Atendimentos 
    INNER JOIN Clientes INNER JOIN Pets INNER JOIN Servicos WHERE Atendimentos.clienteId = Clientes.id 
    AND Atendimentos.petId = Pets.id AND Atendimentos.servicoId = Servicos.id`;
    

    return executaQuery(sql).then(customerServices => {
      return customerServices.map(cs => ({
        id: cs.id,
        data: cs.data,
        status: cs.status,
        observacoes: cs.observacoes,
        cliente: {
          id: cs.clienteId,
          nome: cs.clienteNome,
          cpf: cs.clienteCpf
        },
        pet: {
          id: cs.petId,
          nome: cs.petNome,
          tipo: cs.petTipo,
          observacoes: cs.petObservacoes
        },
        servico: {
          id: cs.servicoId,
          nome: cs.servicoNome,
          preco: cs.servicoPreco,
          descricao: cs.servicoDescricao
        }
      }))
    })
  }

  findById(id) {
    const sql = `SELECT Atendimentos.id, Atendimentos.data, Atendimentos.status, Atendimentos.observacoes, 
    Pets.id as petId, Pets.nome as petNome, Pets.tipo as petTipo, Pets.observacoes as petObservacoes, 
    Clientes.id as clienteId, Clientes.nome as clienteNome, Clientes.cpf as clienteCpf, Servicos.id as servicoId, 
    Servicos.nome as servicoNome, Servicos.preco as servicoPreco, Servicos.descricao as servicoDescricao FROM Atendimentos 
    INNER JOIN Clientes INNER JOIN Pets INNER JOIN Servicos WHERE Atendimentos.clienteId = Clientes.id 
    AND Atendimentos.petId = Pets.id AND Atendimentos.servicoId = Servicos.id AND Atendimentos.id = ${id}`

    return executaQuery(sql)
      .then(response => ({
        id: response[0].id,
        data: response[0].data,
        status: response[0].status,
        observacoes: response[0].observacoes,
        cliente: {
          id: response[0].clienteId,
          nome: response[0].clienteId,
          cpf: response[0].clienteNome
        },
        pet: {
          id: response[0].petId,
          nome: response[0].petNome,
          tipo: response[0].petTipo,
          observacoes: response[0].petObservacoes
        },
        servico: {
          id: response[0].servicoId,
          nome: response[0].servicoNome,
          preco: response[0].servicoPreco,
          descricao: response[0].servicoDescricao
        }
      }))
  }

  add(item) {
    const { clienteId, petId, servicoId, status, observacoes } = item
    const data = new Date();
    const dia  = data.getDate().toString().padStart(2, '0');
    const mes  = (data.getMonth()+1).toString().padStart(2, '0'); //+1 pois no getMonth Janeiro começa com zero.
    const ano  = data.getFullYear();
    const formatedDate = ano+"-"+mes+"-"+dia;

    console.log(formatedDate, data) 

    const sql = `INSERT INTO Atendimentos(clienteId, petId, servicoId, data, status, observacoes) 
      VALUES(${clienteId}, ${petId}, ${servicoId}, '${formatedDate}', '${status}', '${observacoes}'); 
      SELECT * FROM Clientes WHERE Clientes.id = ${clienteId}; 
      SELECT * FROM Pets WHERE Pets.id = ${petId}; 
      SELECT * FROM Servicos WHERE Servicos.id = ${servicoId};`

      return executaQuery(sql).then(resposta => 
        { const dados = resposta[0]
          const cliente = resposta[1][0]
          const pet = resposta[2][0]
          const servico = resposta[3][0]
            return ({
              id: dados.insertId,
              cliente,
              pet,
              servico,
              data,
              status,
              observacoes
          })
      }
      )
    }

  update(novoItem) {
    const { id, clienteId, petId, servicoId, status, observacoes } = novoItem
    const data = new Date();
    const dia  = data.getDate().toString().padStart(2, '0');
    const mes  = (data.getMonth()+1).toString().padStart(2, '0'); //+1 pois no getMonth Janeiro começa com zero.
    const ano  = data.getFullYear();
    const formatedDate = ano+"-"+mes+"-"+dia;
  
    const sql = `UPDATE Atendimentos SET clienteId=${clienteId}, petId=${petId}, 
    servicoId=${servicoId}, status='${status}', data='${formatedDate}', observacoes='${observacoes}' 
    WHERE id=${id}; SELECT * FROM Clientes WHERE Clientes.id = ${clienteId}; 
    SELECT * FROM Pets WHERE Pets.id = ${petId}; SELECT * FROM Servicos WHERE Servicos.id = ${servicoId}`

    return executaQuery(sql)
      .then(response => 
        {
        const cliente = response[1][0];
        const pet = response[2][0];
        const servico = response[3][0];
        
        return ({
          id,
          data,
          status,
          observacoes,
          cliente,
          pet,
          servico
        })
        }
      )
  }

  delete(id) {
    const sql = `DELETE FROM Atendimentos WHERE id=${id}`

    return executaQuery(sql)
      .then(() => id)
  }
}

module.exports = new CustomerService
