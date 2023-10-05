// sample test
// Para rodar os testes, use: npm test
// PS: Os testes não estão completos e alguns podem comnter erros.

// veja mais infos em:
// https://mochajs.org/
// https://www.chaijs.com/
// https://www.chaijs.com/plugins/chai-json-schema/
// https://developer.mozilla.org/pt-PT/docs/Web/HTTP/Status (http codes)

const app = require('../src/index.js')

const assert = require('assert')
const chai = require('chai')
const chaiHttp = require('chai-http')
const chaiJson = require('chai-json-schema')
const { before } = require('mocha')
const { execSync } = require('node:child_process')

chai.use(chaiHttp)
chai.use(chaiJson)

const expect = chai.expect

// Define o minimo de campos que o usuário deve ter. Geralmente deve ser colocado em um arquivo separado
const userSchema = {
  title: 'Schema do Usuario, define como é o usuario, linha 24 do teste',
  type: 'object',
  required: ['nome', 'email', 'idade'],
  properties: {
    nome: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    idade: {
      type: 'number',
      minimum: 18,
    },
  },
}

// este teste é simplesmente pra enteder a usar o mocha/chai
before(() => {
  // Method to execute a command in terminal
  execSync('npm run knex migrate:rollback --all')
  execSync('npm run knex migrate:latest')
})

describe('Um simples conjunto de testes', function () {
  it('deveria retornar -1 quando o valor não esta presente', function () {
    assert.equal([1, 2, 3].indexOf(4), -1)
  })
})


// testes da aplicação
describe('Testes da aplicaçao', () => {
  it('o servidor esta online', function (done) {
    chai
      .request(app)
      .get('/')
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        done()
      })
  })

  it('deveria ser uma lista vazia de usuarios', function (done) {
    chai
      .request(app)
      .get('/users')
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.eql([])
        done()
      })
  })

  it('deveria criar o usuario raupp', function (done) {
    chai
      .request(app)
      .post('/user')
      .send({ nome: 'raupp', email: 'jose.raupp@devoz.com.br', idade: 35 })
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(201)
        done()
      })
  })
  // ...adicionar pelo menos mais 5 usuarios. se adicionar usuario menor de idade, deve dar erro. Ps: não criar o usuario naoExiste
  const nomes = ['messi', 'ronaldo', 'haaland', 'neymar', 'gustavo-gomes']

  for (const nome of nomes) {
    it(`deveria criar o usuario ${nome}`, function (done) {
      chai
        .request(app)
        .post('/user')
        .send({ nome, email: `${nome}@example.com`, idade: 35 })
        .end(function (err, res) {
          expect(err).to.be.null
          expect(res).to.have.status(201)
          done()
        })
    })
  }

  it('não deveria criar usuário menor de idade', function (done) {
    chai
      .request(app)
      .post('/user')
      .send({ nome: 'endrick', email: 'endrick@example.com', idade: 17 })
      .end(function (err, res) {
        expect(res).to.have.property('error')
        expect(res).to.have.status(400)
        done()
      })
  })


  it('o usuario naoExiste não existe no sistema', function (done) {
    chai
      .request(app)
      .get('/user/naoExiste')
      .end(function (err, res) {
        expect(res).to.have.property('error')
        expect(res).to.have.status(404)
        done()
      })
  })

  it('o usuario raupp existe e é valido', function (done) {
    chai
      .request(app)
      .get('/user/raupp')
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body).to.be.jsonSchema(userSchema)
        done()
      })
  })

  it('deveria excluir o usuario raupp', function (done) {
    chai
      .request(app)
      .delete('/user/raupp')
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(204)
        done()
      })
  })

  it('o usuario raupp não deve existir mais no sistema', function (done) {
    chai
      .request(app)
      .get('/user/raupp')
      .end(function (err, res) {
        expect(res).to.have.property('error')
        expect(res).to.have.status(404)
        done()
      })
  })

  it('deveria ser uma lista com pelomenos 5 usuarios', function (done) {
    chai
      .request(app)
      .get('/users')
      .end(function (err, res) {
        expect(err).to.be.null
        expect(res).to.have.status(200)
        expect(res.body.length).to.be.at.least(5)
        done()
      })
  })
})
