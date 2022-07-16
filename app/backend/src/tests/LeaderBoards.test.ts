import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Matches';
import Teams from '../database/models/Teams';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Verificar o end point /leaderboard/home', () => {
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
        homeTeamGoals: 2,
        awayTeam: 8,
        awayTeamGoals: 1,
        inProgress: false,
        teamHome: {
            teamName: 'São Paulo',
          },
        teamAway: {
            teamName: 'Grêmio',
          }
      }, {
        id: 2,
        homeTeam: 8,
        homeTeamGoals: 10,
        awayTeam: 16,
        awayTeamGoals: 3,
        inProgress: false,
        teamHome: {
            teamName: 'Grêmio',
          },
        teamAway: {
            teamName: 'São Paulo',
          }
      },
      {
        id: 2,
        homeTeam: 10,
        homeTeamGoals: 0,
        awayTeam: 20,
        awayTeamGoals: 3,
        inProgress: false,
        teamHome: {
            teamName: 'Flamengo',
          },
        teamAway: {
            teamName: 'Vasco',
          }
      },
      {
        id: 2,
        homeTeam: 20,
        homeTeamGoals: 4,
        awayTeam: 10,
        awayTeamGoals: 3,
        inProgress: false,
        teamHome: {
            teamName: 'Vasco',
          },
        teamAway: {
            teamName: 'Flamengo',
          }
      }
    ] as Matches[]);

      sinon
      .stub(Teams, "findAll")
      .resolves([{
        id: 16,
        teamName: 'São Paulo',
      }, {
        id: 8,
        teamName: 'Grêmio',
      },
      {
        id: 20,
        teamName: 'Vasco',
      },
      {
        id: 10,
        teamName: 'Flamengo',
      }] as Teams[]);
  });
  
  after(()=>{
    (Matches.findAll as sinon.SinonStub).restore();
    (Teams.findAll as sinon.SinonStub).restore();
  })

  it('Verificar se a requição de /leaderboard/home', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/home');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.not.empty;
    expect(chaiHttpResponse.body).to.be.a("array");
    expect(chaiHttpResponse.body[0]).to.be.have.property('name');
    expect(chaiHttpResponse.body[0]).to.be.have.property('totalPoints');
    expect(chaiHttpResponse.body[0]).to.be.have.property('totalGames');
    expect(chaiHttpResponse.body[0]).to.be.have.property('totalVictories');
    expect(chaiHttpResponse.body[0]).to.be.have.property('totalDraws');
    expect(chaiHttpResponse.body[0]).to.be.have.property('totalLosses');
    expect(chaiHttpResponse.body[0]).to.be.have.property('goalsFavor');
    expect(chaiHttpResponse.body[0]).to.be.have.property('goalsOwn');
    expect(chaiHttpResponse.body[0]).to.be.have.property('goalsBalance');
    expect(chaiHttpResponse.body[0]).to.be.have.property('efficiency');
  });
  it('Verificar se a requição de /leaderboard/away', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard/away');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.not.empty;
    expect(chaiHttpResponse.body).to.be.a("array");
    expect(chaiHttpResponse.body[0]).to.be.have.property('name');
    expect(chaiHttpResponse.body[0]).to.be.have.property('totalPoints');
    expect(chaiHttpResponse.body[0]).to.be.have.property('totalGames');
    expect(chaiHttpResponse.body[0]).to.be.have.property('totalVictories');
    expect(chaiHttpResponse.body[0]).to.be.have.property('totalDraws');
    expect(chaiHttpResponse.body[0]).to.be.have.property('totalLosses');
    expect(chaiHttpResponse.body[0]).to.be.have.property('goalsFavor');
    expect(chaiHttpResponse.body[0]).to.be.have.property('goalsOwn');
    expect(chaiHttpResponse.body[0]).to.be.have.property('goalsBalance');
    expect(chaiHttpResponse.body[0]).to.be.have.property('efficiency');
  });
  it('Verificar se a requição de /leaderboard', async () => {
    chaiHttpResponse = await chai.request(app).get('/leaderboard');
    expect(chaiHttpResponse.status).to.be.equal(200);
    expect(chaiHttpResponse.body).to.not.empty;
    expect(chaiHttpResponse.body).to.be.a("array");
    expect(chaiHttpResponse.body[0]).to.be.have.property('name');
    expect(chaiHttpResponse.body[0]).to.be.have.property('totalPoints');
    expect(chaiHttpResponse.body[0]).to.be.have.property('totalGames');
    expect(chaiHttpResponse.body[0]).to.be.have.property('totalVictories');
    expect(chaiHttpResponse.body[0]).to.be.have.property('totalDraws');
    expect(chaiHttpResponse.body[0]).to.be.have.property('totalLosses');
    expect(chaiHttpResponse.body[0]).to.be.have.property('goalsFavor');
    expect(chaiHttpResponse.body[0]).to.be.have.property('goalsOwn');
    expect(chaiHttpResponse.body[0]).to.be.have.property('goalsBalance');
    expect(chaiHttpResponse.body[0]).to.be.have.property('efficiency');
  });
});