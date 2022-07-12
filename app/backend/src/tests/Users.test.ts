import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/Users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verificar o end point /login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */
   let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
      } as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('O usuario consegue o acesso e retorna um token', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin'
    });
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.have.property('token');
  });

  it('O usuario não pode ter acesso sem informar um email', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      password: 'secret_admin'
    });
    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({message: 'All fields must be filled'});
  });
  it('O usuario não pode ter acesso sem informar um senha', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.com'
    });
    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({message: 'All fields must be filled'});
  });
  it('O usuario não pode ter um email invalido', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'adminadmin'
    });
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({message: 'Incorrect email or password'});
  });
  it('O usuario não pode ter uma senha invalida', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret'
    });
    expect(chaiHttpResponse.status).to.be.equal(401);
    expect(chaiHttpResponse.body).to.deep.equal({message: 'Incorrect email or password'});
  });
});

describe('Verificar o end point /login/validade', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */
   let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        username: 'Admin',
        role: 'admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
      } as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('verifica se endpoint retorna os dados corretamente', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/:validate').set({
      Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImFpcmFtbG9iYXRvQGdtYWlsLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.RaEPuup6mH3RsQADVTH_VKpSDtLW4PS-To9-3LhaI38',
    })
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.be.have.property('role');
  });
  it('verifica não tiver authorization aparece uma mensagem de erro', async () => {
    chaiHttpResponse = await chai.request(app).get('/login/:validate').set({
      Authorization: '',
    })
    expect(chaiHttpResponse.status).to.be.equal(400);
    expect(chaiHttpResponse.body).to.deep.equal({message: 'Token expired or invalid'});
  });

});
