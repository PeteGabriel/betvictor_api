import "reflect-metadata";
import { Sport } from "../../../src/2application/domain/Sport";
import { BetvictorGateway } from "../../../src/3infrastructure/impl/BetvictorGateway";
import { IBetvictorGateway } from "../../../src/3infrastructure/interfaces/IBetvictorGateway";
const assert = require('assert');
const nock = require('nock');

const allSportsResponse = require('../mock_data/all_sports.json');

describe('Requesting all sports', function () {
 it('should return OK with valid response', async function () {

    // mock http request
    nock('http://www.betvictor.com')
      .get('/live/en/live/list.json')
      .reply(200, allSportsResponse);

    const expectedSetOfSports = allSportsResponse['sports'].map(sp => new Sport(sp));

    const gateway: IBetvictorGateway = new BetvictorGateway();
    const res: Sport[] = await gateway.getAllSports()
      .then((res) => res)
      .then(sports => sports.map(sp => new Sport(sp)))
      .catch((e) => { throw e; });

    assert.equal(expectedSetOfSports.length, res.length);
    const sportInst: Sport = expectedSetOfSports[0];
    assert.equal(sportInst.id, res[0].id);
    assert.equal(sportInst.pos, res[0].pos);
    assert.equal(sportInst.title, res[0].title);
    assert.equal(sportInst.events.length, res[0].events.length);
 });
});
