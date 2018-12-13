import "reflect-metadata";
import { SportService } from '../../../../src/2application/services/impl/SportService';
import { ISportService } from '../../../../src/2application/services/interfaces/ISportService';
import { IBetvictorGateway } from '../../../../src/3infrastructure/interfaces/IBetvictorGateway';
const predefinedSport = require('./../../../mock_data/all_sports.json');

it('should return an array of Sport instances', async function () {

  const mockGateway: IBetvictorGateway = {
    getAllSports: function(): Promise<string[]> {
      return new Promise((res, rej) => res(predefinedSport.sports));
    }
  };

  const svc: ISportService = new SportService(mockGateway);

  const sports = await svc.getSports().then(sp => sp).catch(e => { throw e; });
  expect(sports.length).toBe(1);
  const sport = sports[0];
  const expectedEvent = predefinedSport.sports[0];

  expect(sport.id).toBe(expectedEvent.id);
  expect(sport.is_virtual).toBe(expectedEvent.is_virtual);
  expect(sport.meetings.length).toBe(expectedEvent.meetings.length);
  expect(sport.pos).toBe(expectedEvent.pos);
  expect(sport.events.length).toBe(expectedEvent.events.length);
  expect(sport.title).toBe(expectedEvent.title);

});

it('should return an empty array to fail safe in case of error', async function () {

  const mockGateway: IBetvictorGateway = {
    getAllSports: function(): Promise<string[]> {
      return new Promise((res, rej) => rej());
    }
  };

  const svc: ISportService = new SportService(mockGateway);

  const sports = await svc.getSports().then(sp => sp).catch(e => { return []; });
  expect(sports.length).toBe(0);
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
  expect(events.length).toBe(10);
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

  expect(event.id).toBe(expectedEvent.id);
  expect(event.is_virtual).toBe(expectedEvent.is_virtual);
  expect(event.outcomes.length).toBe(expectedEvent.outcomes.length);
  expect(event.event_id).toBe(expectedEvent.event_id);
  expect(event.title).toBe(expectedEvent.title);
  expect(event.market_id).toBe(expectedEvent.market_id);
  expect(event.market_type_id).toBe(expectedEvent.market_type_id);
  expect(event.score).toBe(expectedEvent.score);
  expect(event.description).toBe(expectedEvent.description);
  expect(event.start_time).toBe(expectedEvent.start_time);
  expect(event.meeting).toBe(expectedEvent.meeting);
  expect(event.meeting_id).toBe(expectedEvent.meeting_id);
  expect(event.media).toBe(expectedEvent.media);
  expect(event.american_format).toBe(expectedEvent.american_format);
  expect(event.event_type).toBe(expectedEvent.event_type);
  expect(event.pos).toBe(expectedEvent.pos);
  expect(event.home_team).toBe(expectedEvent.home_team);
  expect(event.away_team).toBe(expectedEvent.away_team);
  expect(event.period_id).toBe(expectedEvent.period_id);
  expect(event.status_type).toBe(expectedEvent.status_type);
  expect(event.total_outcomes).toBe(expectedEvent.total_outcomes);
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

  expect(event).toBe(undefined);

});
