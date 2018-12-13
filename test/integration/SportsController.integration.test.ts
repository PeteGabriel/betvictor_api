import "reflect-metadata";
import app from "../../src/app";
import { Problem, ProblemJsonMediaType } from "../../src/1presentation/responses/Problem";
const request = require("supertest");
const nock = require('nock');

const ListAllSportsUri = "/api/sports";
const ListAllEventsForSportUri = "/api/sports/100/events";
const ListAllDataForEvent = "/api/sports/100/events/1013539500";

const allSportsResponse = require('../mock_data/all_sports.json');




describe(ListAllSportsUri, () => {
  describe("GET", () => {
        test("it should obtain a representation of all sports", async done => {

            nock('http://www.betvictor.com')
              .get('/live/en/live/list.json')
              .reply(200, allSportsResponse);

            const response = await request(app).get(ListAllSportsUri);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body.length).toBeGreaterThanOrEqual(1);
            expect(response.type).toBe('application/json');

            done();
        });

        test("it should respond ok when exists a representation of all sports in cache", async done => {

          nock.restore();
          nock.activate();
          nock.cleanAll();

          const response = await request(app).get(ListAllSportsUri);

          expect(response.statusCode).toBe(200);
          expect(response.body).toBeDefined();
          expect(response.body.length).toBeGreaterThanOrEqual(1);
          expect(response.type).toBe('application/json');

          done();
        });
    });
});

describe(ListAllEventsForSportUri, () => {
    describe("GET", () => {
        beforeEach((done) => {
          nock('http://www.betvictor.com')
            .get('/live/en/live/list.json')
            .reply(200, allSportsResponse);
          done();
        });

        test("it should obtain a representation of all events for a given sport", async done => {

          const response = await request(app).get(ListAllEventsForSportUri);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.body.length).toBeGreaterThanOrEqual(1);
            expect(response.type).toBe('application/json');

            done();
        });

        test("it should respond with not found status when cannot find specific sport", async done => {

          const response = await request(app).get("/api/sports/1/events");
          expect(response.statusCode).toBe(404);
          expect(response.body).toBeDefined();
          expect(response.type).toBe(ProblemJsonMediaType);

          const problem: Problem = response.body;

          expect(problem.status).toBe(404);
          expect(problem.title).toBeDefined();
          expect(problem.detail).toBeDefined();
          done();
      });

      test("it should respond with not found status when cannot obtain a representation of all sports", async done => {

        nock.restore();
        nock.activate();
        nock.cleanAll();

        const response = await request(app).get(ListAllEventsForSportUri);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.length).toBeGreaterThanOrEqual(1);
        expect(response.type).toBe('application/json');
        done();
      });
    });
});


describe(ListAllDataForEvent, () => {
    describe("GET", () => {
        beforeEach((done) => {
          nock('http://www.betvictor.com')
            .get('/live/en/live/list.json')
            .reply(200, allSportsResponse);
          done();
        });

        test("it should obtain a representation of specific event", async done => {

            const response = await request(app).get(ListAllDataForEvent);
            expect(response.statusCode).toBe(200);
            expect(response.body).toBeDefined();
            expect(response.type).toBe('application/json');

            const event = response.body;
            const expectedEvent = allSportsResponse.sports[0].events.find(evt => evt.id == event.id);

            assertEvent(event, expectedEvent);

            done();
        });

      test("it should respond with not found status when cannot find specific event", async done => {

          const response = await request(app).get("/api/sports/100/events/10");
          expect(response.statusCode).toBe(404);
          expect(response.body).toBeDefined();
          expect(response.type).toBe(ProblemJsonMediaType);

          const problem: Problem = response.body;

          expect(problem.status).toBe(404);
          expect(problem.title).toBeDefined();
          expect(problem.detail).toBeDefined();
          done();
      });

      test("it should respond with not found status when cannot obtain a representation of all sports", async done => {

        nock.restore();
        nock.activate();
        nock.cleanAll();

        const response = await request(app).get(ListAllDataForEvent);
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.type).toBe('application/json');

        const event = response.body;
        const expectedEvent = allSportsResponse.sports[0].events.find(evt => evt.id == event.id);

        assertEvent(event, expectedEvent);
        done();
      });
    });
});


function assertEvent(event: any, expectedEvent: any) {
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
}

