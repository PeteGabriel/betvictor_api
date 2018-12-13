import "reflect-metadata";
import { SportsController } from '../../../../src/1presentation/controllers/SportsController';
import { Event } from '../../../../src/2application/domain/Event';
import { Sport } from "../../../../src/2application/domain/Sport";
import { ISportService } from '../../../../src/2application/services/interfaces/ISportService';

const assert = require('assert');

const predefinedSport = require('../../mock_data/all_sports.json');

it('should return a representation of all sports', async function () {

  const serviceMock: ISportService = {
    getSports: function(): Promise<Sport[]> {
        return new Promise((res, rej) => res(predefinedSport.sports));
    },
    getEvents: undefined,
    getEvent: undefined
};

  const ctrl: SportsController = new SportsController(serviceMock);

  const onRes = (data) => {
    return data;
};

  const sports = await ctrl.getSports(onRes, (_) => {}).then(res => res).catch(e => { throw e; });
  const sport = sports[0];
  const expectedSport = predefinedSport.sports[0];
  assert.equal(sport.id, expectedSport.id);
  assert.equal(sport.is_virtual, expectedSport.is_virtual);
  assert.equal(sport.meetings.length, expectedSport.meetings.length);
  assert.equal(sport.pos, expectedSport.pos);
  assert.equal(sport.events.length, expectedSport.events.length);
  assert.equal(sport.title, expectedSport.title);

});


it('should return a representation of all events for a given sport', async function () {

  const serviceMock: ISportService = {
    getEvents: function(_: number): Promise<Event[]> {
      return new Promise((res, rej) => res(predefinedSport.sports[0].events));
    },
    getSports: undefined,
    getEvent: undefined
};

  const ctrl: SportsController = new SportsController(serviceMock);

  const onRes = (data) => {
    return data;
};

  const sportId = 100;
  const events = await ctrl.getEvents(sportId, onRes, (_) => {}).then(res => res).catch(e => { throw e; });

  assert.equal(events.length, 10);

});

it('should return an empty array when searching for all events of a not found sport', async function () {

  const serviceMock: ISportService = {
    getEvents: function(_: number): Promise<Event[]> {
      return new Promise((res, rej) => res([]));
    },
    getSports: undefined,
    getEvent: undefined
};

  const ctrl: SportsController = new SportsController(serviceMock);

  const onRes = (data) => {
    return data;
};

  const sportId = 1;
  const events = await ctrl.getEvents(sportId, onRes, (_) => {}).then(res => res).catch(e => { throw e; });

  assert.equal(events.length, 0);

});

it('should return a representation of an event for a given sport', async function () {

  const sportId = 100;
  const eventId = 1013539500;

  const serviceMock: ISportService = {
    getEvents: undefined,
    getSports: undefined,
    getEvent: function(_: number, __: number): Promise<Event> {
      return new Promise((res, rej) => res(predefinedSport.sports[0].events.find(e => e.id == eventId)));
    }
};

  const ctrl: SportsController = new SportsController(serviceMock);

  const onRes = (data) => {
    return data;
};


  const event = await ctrl.getEvent(sportId, eventId, onRes, (_) => {}).then(res => res).catch(e => { throw e; });

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