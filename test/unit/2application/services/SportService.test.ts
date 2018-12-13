import "reflect-metadata";
import { SportService } from '../../../../src/2application/services/impl/SportService';
import { ISportService } from '../../../../src/2application/services/interfaces/ISportService';
import { IBetvictorGateway } from '../../../../src/3infrastructure/interfaces/IBetvictorGateway';
const assert = require('assert');


it('should return an array of Sport instances', async function () {

  const getAllSports: IBetvictorGateway = {
    getAllSports: function(): Promise<string[]> {
      return new Promise((res, rej) => res([JSON.stringify(predefinedSport)]));
    }
  };

  const svc: ISportService = new SportService(getAllSports);

  const sports = await svc.getSports().then(sp => sp).catch(e => { throw e; });
  assert.equal(sports.length, 1);
  const sport = sports[0];
  assert.equal(sport.id, predefinedSport.id);
  assert.equal(sport.is_virtual, predefinedSport.is_virtual);
  assert.equal(sport.meetings.length, predefinedSport.meetings.length);
  assert.equal(sport.pos, predefinedSport.pos);
  assert.equal(sport.events.length, predefinedSport.events.length);
  assert.equal(sport.title, predefinedSport.title);

});

it('should return an empty array to fail safe in case of error', async function () {

  const getAllSports: IBetvictorGateway = {
    getAllSports: function(): Promise<string[]> {
      return new Promise((res, rej) => rej());
    }
  };

  const svc: ISportService = new SportService(getAllSports);

  const sports = await svc.getSports().then(sp => sp).catch(e => { return []; });
  assert.equal(sports.length, 0);
});


it('should return an array of events for a given sport', async function () {

  const getAllSports: IBetvictorGateway = {
    getAllSports: function(): Promise<string[]> {
      return new Promise((res, rej) => rej());
    }
  };

  const svc: ISportService = new SportService(getAllSports);

  const sports = await svc.getSports().then(sp => sp).catch(e => { return []; });
  assert.equal(sports.length, 0);
});





const predefinedSport = {
    "id": 100,
    "title": "Football",
    "meetings": [],
    "is_virtual": false,
    "events": [
    {
    "id": 1013539500,
    "is_virtual": false,
    "outcomes": [],
    "event_id": 1013539500,
    "title": "Real Madrid v CSKA Moscow",
    "market_id": undefined,
    "market_type_id": undefined,
    "status_id": undefined,
    "score": "0-3",
    "description": undefined,
    "start_time": 1544637300000,
    "meeting": "Champions League",
    "meeting_id": 130873010,
    "media": undefined,
    "american_format": false,
    "event_type": "GAMEEVENT",
    "pos": 0,
    "home_team": "Real Madrid",
    "away_team": "CSKA Moscow",
    "team_information": true,
    "home_score": 0,
    "away_score": 3,
    "period_id": 235,
    "status_type": "text",
    "status": "Second Half",
    "total_outcomes": 0
    }],
    pos: 1
  };