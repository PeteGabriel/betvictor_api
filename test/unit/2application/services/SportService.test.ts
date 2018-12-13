import "reflect-metadata";
import { SportService } from '../../../../src/2application/services/impl/SportService';
import { ISportService } from '../../../../src/2application/services/interfaces/ISportService';
import { IBetvictorGateway } from '../../../../src/3infrastructure/interfaces/IBetvictorGateway';
const assert = require('assert');


it('should return an array of Sport instances', async function () {

  const mockGateway: IBetvictorGateway = {
    getAllSports: function(): Promise<string[]> {
      return new Promise((res, rej) => res([JSON.stringify(predefinedSport)]));
    }
  };

  const svc: ISportService = new SportService(mockGateway);

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

  const mockGateway: IBetvictorGateway = {
    getAllSports: function(): Promise<string[]> {
      return new Promise((res, rej) => rej());
    }
  };

  const svc: ISportService = new SportService(mockGateway);

  const sports = await svc.getSports().then(sp => sp).catch(e => { return []; });
  assert.equal(sports.length, 0);
});


it('should return an array of events for a given sport', async function () {

  const mockGateway: IBetvictorGateway = {
    getAllSports: function(): Promise<string[]> {
      return new Promise((res, rej) => res([JSON.stringify(predefinedSport)]));
    }
  };

  const svc: ISportService = new SportService(mockGateway);

  const sportId = 100;
  const events = await svc.getEvents(sportId).then(sp => sp).catch(e => { return []; });
  assert.equal(events.length, 1);
});


it('should return all data for a given event of a given sport', async function () {

  const mockGateway: IBetvictorGateway = {
    getAllSports: function(): Promise<string[]> {
      return new Promise((res, rej) => res([JSON.stringify(predefinedSport)]));
    }
  };

  const svc: ISportService = new SportService(mockGateway);

  const sportId = 100;
  const eventId = 1013539500;
  const event = await svc.getEvent(sportId, eventId).then(evt => evt).catch(e => { return undefined; });

  const expectedEvent = predefinedSport.events[0];

  assert.equal(event.id, expectedEvent.id);
  assert.equal(event.is_virtual, expectedEvent.is_virtual);
  assert.equal(event.outcomes.length, expectedEvent.outcomes.length);
  assert.equal(event.event_id, expectedEvent.event_id);
  assert.equal(event.title, expectedEvent.title);
  assert.equal(event.market_id, expectedEvent.market_id);
  assert.equal(event.market_type_id, expectedEvent.market_type_id);
  assert.equal(event.score, expectedEvent.score);
  assert.equal(event.description, expectedEvent.description);
  assert.equal(event.start_time, expectedEvent.start_time);
  assert.equal(event.meeting, expectedEvent.meeting);
  assert.equal(event.meeting_id, expectedEvent.meeting_id);
  assert.equal(event.media, expectedEvent.media);
  assert.equal(event.american_format, expectedEvent.american_format);
  assert.equal(event.event_type, expectedEvent.event_type);
  assert.equal(event.pos, expectedEvent.pos);
  assert.equal(event.home_team, expectedEvent.home_team);
  assert.equal(event.away_team, expectedEvent.away_team);
  assert.equal(event.period_id, expectedEvent.period_id);
  assert.equal(event.status_type, expectedEvent.status_type);
  assert.equal(event.total_outcomes, expectedEvent.total_outcomes);
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