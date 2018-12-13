import "reflect-metadata";
import app from "../../src/app";
const request = require("supertest");
const nock = require('nock');

const ListAllSportsUri = "/api/sports";

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

            done();
        });

    });
});