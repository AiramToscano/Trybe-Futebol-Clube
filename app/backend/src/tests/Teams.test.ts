import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Teams from '../database/models/Teams';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verificar o end point /teams', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */
   let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Teams, "findAll")
      .resolves([{
        id: 1,
        teamName: 'Flamengo',
      }] as Teams[]);
  });

  after(()=>{
    (Teams.findAll as sinon.SinonStub).restore();
  })

  it('Verificar se a requição de times vem de forma correta', async () => {
    chaiHttpResponse = await chai.request(app).get('/teams');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.not.empty;
    expect(chaiHttpResponse.body).to.be.a("array");
  });
});

describe('Verificar o end point /teams/id', () => {
    /**
     * Exemplo do uso de stubs com tipos
     */
     let chaiHttpResponse: Response;
  
    before(async () => {
      sinon
        .stub(Teams, "findOne")
        .resolves({
        id: 1,
        teamName: 'Flamengo',
        } as Teams);
    });
  
    after(()=>{
      (Teams.findOne as sinon.SinonStub).restore();
    })
  
    it('verifica se endpoint retorna os dados corretamente', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams/:id');
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.be.have.property('id');
      expect(chaiHttpResponse.body).to.be.have.property('teamName');
      expect(chaiHttpResponse.body).to.deep.equal({id: 1, teamName: 'Flamengo' });
    });
  });
  
