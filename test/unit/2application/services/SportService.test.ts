import "reflect-metadata";
import { SportService } from '../../../../src/2application/services/impl/SportService';
import { ISportService } from '../../../../src/2application/services/interfaces/ISportService';
import { IBetvictorGateway } from '../../../../src/3infrastructure/interfaces/IBetvictorGateway';
const assert = require('assert');

const predefinedSport = require('../../mock_data/all_sports.json');

it('should return an array of Sport instances', async function () {

  const mockGateway: IBetvictorGateway = {
    getAllSports: function(): Promise<string[]> {
      return new Promise((res, rej) => res(predefinedSport.sports));
    }
  };

  const svc: ISportService = new SportService(mockGateway);

  const sports = await svc.getSports().then(sp => sp).catch(e => { throw e; });
  assert.equal(sports.length, 1);
  const sport = sports[0];
  const expectedEvent = predefinedSport.sports[0];

  assert.equal(sport.id, expectedEvent.id);
  assert.equal(sport.is_virtual, expectedEvent.is_virtual);
  assert.equal(sport.meetings.length, expectedEvent.meetings.length);
  assert.equal(sport.pos, expectedEvent.pos);
  assert.equal(sport.events.length, expectedEvent.events.length);
  assert.equal(sport.title, expectedEvent.title);

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
      return new Promise((res, rej) => res(predefinedSport.sports));
    }
  };

  const svc: ISportService = new SportService(mockGateway);

  const sportId = 100;
  const events = await svc.getEvents(sportId).then(sp => sp).catch(e => { return []; });
  assert.equal(events.length, 10);
});


it('should return all data for a given event of a given sport', async function () {

  const mockGateway: IBetvictorGateway = {
    getAllSports: function(): Promise<string[]> {
      return new Promise((res, rej) => res(predefinedSport.sports));
    }
  };

  const svc: ISportService = new SportService(mockGateway);

  const sportId = 100;
  const eventId = 1013539500;
  const event = await svc.getEvent(sportId, eventId).then(evt => evt).catch(e => { return undefined; });

  const expectedEvent = predefinedSport.sports[0].events[0];

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

it('should return undefined data for a non existant event', async function () {

  const mockGateway: IBetvictorGateway = {
    getAllSports: function(): Promise<string[]> {
      return new Promise((res, rej) => res([JSON.stringify(predefinedSport.sports)]));
    }
  };

  const svc: ISportService = new SportService(mockGateway);

  const sportId = 100;
  const nonExistantEventId = 1;
  const event = await svc.getEvent(sportId, nonExistantEventId).then(evt => evt).catch(e => { return undefined; });

  assert.equal(event, undefined);

});
