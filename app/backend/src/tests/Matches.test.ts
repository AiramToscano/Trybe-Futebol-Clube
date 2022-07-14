import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Matches';
import jwt from '../utils/CreateJwt';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verificar o end point /matches', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */
   let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Matches, "findAll")
      .resolves([{
        id: 1,
        homeTeam: 16,
        homeTeamGoals: 1,
        awayTeam: 8,
        awayTeamGoals: 1,
        inProgress: false,
        teamHome: {
            teamName: "São Paulo"
          },
        teamAway: {
            teamName: "Grêmio"
          }
      }] as Matches[]);
  });

  after(()=>{
    (Matches.findAll as sinon.SinonStub).restore();
  })

  it('Verificar se a requição de matches vem de forma correta', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.not.empty;
    expect(chaiHttpResponse.body).to.be.a("array");
    expect(chaiHttpResponse.body[0]).to.be.have.property('id');
    expect(chaiHttpResponse.body[0]).to.be.have.property('homeTeam');
    expect(chaiHttpResponse.body[0]).to.be.have.property('homeTeamGoals');
    expect(chaiHttpResponse.body[0]).to.be.have.property('awayTeam');
    expect(chaiHttpResponse.body[0]).to.be.have.property('awayTeamGoals');
    expect(chaiHttpResponse.body[0]).to.be.have.property('inProgress');
    expect(chaiHttpResponse.body[0]).to.be.have.property('teamHome');
    expect(chaiHttpResponse.body[0]).to.be.have.property('teamAway');
  });
});

describe('Verificar o end point /matches?inProgress=true', () => {
    /**
     * Exemplo do uso de stubs com tipos
     */
     let chaiHttpResponse: Response;
  
    before(async () => {
      sinon
        .stub(Matches, "findAll")
        .resolves([{
          id: 1,
          homeTeam: 16,
          homeTeamGoals: 1,
          awayTeam: 8,
          awayTeamGoals: 1,
          inProgress: true,
          teamHome: {
              teamName: "São Paulo"
            },
          teamAway: {
              teamName: "Internacional"
            }
        }] as Matches[]);
    });
  
    after(()=>{
      (Matches.findAll as sinon.SinonStub).restore();
    })
  
    it('Verificar se a requição de matches vem de forma correta', async () => {
      chaiHttpResponse = await chai.request(app).get('/matches');
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.not.empty;
      expect(chaiHttpResponse.body).to.be.a("array");
      expect(chaiHttpResponse.body[0]).to.be.have.property('id');
      expect(chaiHttpResponse.body[0]).to.be.have.property('homeTeam');
      expect(chaiHttpResponse.body[0]).to.be.have.property('homeTeamGoals');
      expect(chaiHttpResponse.body[0]).to.be.have.property('awayTeam');
      expect(chaiHttpResponse.body[0]).to.be.have.property('awayTeamGoals');
      expect(chaiHttpResponse.body[0]).to.be.have.property('inProgress');
      expect(chaiHttpResponse.body[0]).to.be.have.property('teamHome');
      expect(chaiHttpResponse.body[0]).to.be.have.property('teamAway');
      expect(chaiHttpResponse.body[0].inProgress).to.be.true; 
    });
  });

describe('Verificar o end point post de /matches', () => {
    /**
     * Exemplo do uso de stubs com tipos
     */
     let chaiHttpResponse: Response;
  
    before(async () => {
      sinon
        .stub(Matches, "create")
        .resolves({
            id: 1,
            homeTeam: 16,
            homeTeamGoals: 2,
            awayTeam: 8,
            awayTeamGoals: 2,
            inProgress: true,
        } as Matches);
    });
  
    after(()=>{
      (Matches.create as sinon.SinonStub).restore();
    })
  
    it('Verificar que não é possivel criar sem um jwt valido', async () => {
      // chaiHttpResponse = await chai.request(app).get('/matches').set({
      //   Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImFpcmFtbG9iYXRvQGdtYWlsLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.RaEPuup6mH3RsQADVTH_VKpSDtLW4PS-To9-3LhaI38',
      // });
      chaiHttpResponse = await chai.request(app).post('/matches').send({
        homeTeam: 16,
        awayTeam: 8,
        homeTeamGoals: 2,
        awayTeamGoals: 2,
      });
      expect(chaiHttpResponse.status).to.be.equal(401);
      expect(chaiHttpResponse.body).to.deep.equal({message: "Token must be a valid token"});
    });
  });

describe('Verificar se é possivel atualizar cadastro em /matches/:id/finish ', () => {
    /**
     * Exemplo do uso de stubs com tipos
     */
     let chaiHttpResponse: Response;
     before(async () => {
      sinon
        .stub(Matches, "update")
        .resolves();
    });
  
    after(()=>{
      (Matches.update as sinon.SinonStub).restore();
    })
  
    it('Verificar se é possivel atualizar o status inProgress', async () => {
      chaiHttpResponse = await chai.request(app).patch('/matches/:id/finish')
      expect(chaiHttpResponse.status).to.be.equal(200);
      expect(chaiHttpResponse.body).to.deep.equal({ message: "Finished" });
      // expect(chaiHttpResponse.body).to.be.have.property('id');
      // expect(chaiHttpResponse.body).to.be.have.property('homeTeam');
      // expect(chaiHttpResponse.body).to.be.have.property('homeTeamGoals');
      // expect(chaiHttpResponse.body).to.be.have.property('awayTeam');
      // expect(chaiHttpResponse.body).to.be.have.property('awayTeamGoals');
      // expect(chaiHttpResponse.body).to.be.have.property('inProgress');
    });
  });

  describe('Verificar se é possivel atualizar /matches/:id', () => {
    /**
     * Exemplo do uso de stubs com tipos
     */
     let chaiHttpResponse: Response;

     before(async () => {
      sinon
        .stub(Matches, "update")
        .resolves();
    });
  
    after(()=>{
      (Matches.update as sinon.SinonStub).restore();
    })
  
    it('Verificar se é possivel atualizar o status homeTeamGoals e AwayTeamGoals', async () => {
      chaiHttpResponse = await chai.request(app).patch('/matches/:id')
      expect(chaiHttpResponse.status).to.be.equal(200);
    });
  });

  //   describe('Verificar se é possivel fazer cadastro em /matches', () => {
  //   /**
  //    * Exemplo do uso de stubs com tipos
  //    */
  //    let chaiHttpResponse: Response;
  //    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImFpcmFtbG9iYXRvQGdtYWlsLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.RaEPuup6mH3RsQADVTH_VKpSDtLW4PS-To9-3LhaI38';
  
  //    before(async () => {
  //     sinon
  //       .stub(jwt, "findOne")
  //       .resolves({
  //           id: 1,
  //           homeTeam: 16,
  //           homeTeamGoals: 2,
  //           awayTeam: 8,
  //           awayTeamGoals: 2,
  //           inProgress: true,
  //       } as jwt);

  //   after(()=>{
  //     (Matches.create as sinon.SinonStub).restore();
  //   })
  
  //   it('Verificar se é possivel criar matches com jwt valido', async () => {
  //     chaiHttpResponse = await chai.request(app).post('/matches')
  //     .set("Authorization", token).send({
  //       homeTeam: 16,
  //       awayTeam: 8,
  //       homeTeamGoals: 2,
  //       awayTeamGoals: 2,
  //     })
  //     expect(chaiHttpResponse.status).to.be.equal(201);
  //     expect(chaiHttpResponse.body).to.be.have.property('id');
  //     expect(chaiHttpResponse.body).to.be.have.property('homeTeam');
  //     expect(chaiHttpResponse.body).to.be.have.property('homeTeamGoals');
  //     expect(chaiHttpResponse.body).to.be.have.property('awayTeam');
  //     expect(chaiHttpResponse.body).to.be.have.property('awayTeamGoals');
  //     expect(chaiHttpResponse.body).to.be.have.property('inProgress');
  //   });
  // });
