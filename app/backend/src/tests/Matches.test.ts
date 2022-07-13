import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Matches';

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
