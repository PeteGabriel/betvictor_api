const request = require("supertest");
import app from "../../src/app";

const ListAllSportsUri = "/api/sports";
const ListAllEventsForSportUri = "/api/sports/:id/events";
const ListAllDataForEvent = "/api/sports/:id/events/:eid";

describe(ListAllSportsUri, () => {
  describe("GET", () => {
      test("it should obtain the most recent resource", async done => {
          const response = await request(app).get(ListAllSportsUri);
          expect(response.statusCode).toBe(200);
          expect(response.body).toBeDefined();

          done();
      });
    });
  });