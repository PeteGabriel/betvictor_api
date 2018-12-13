import "reflect-metadata";
import { Sport } from "../../../src/2application/domain/Sport";
import { BetvictorGateway } from "../../../src/3infrastructure/impl/BetvictorGateway";
import { IBetvictorGateway } from "../../../src/3infrastructure/interfaces/IBetvictorGateway";
import { Cachable } from "../../../src/3infrastructure/cache/Cachable";
const assert = require('assert');
const nock = require('nock');

const allSportsResponse = require('../../mock_data/all_sports.json');

describe('Requesting all sports', function () {
 it('should return OK with valid response even without values in cache', async function () {

    // mock http request
    nock('http://www.betvictor.com')
      .get('/live/en/live/list.json')
      .reply(200, allSportsResponse);

    const expectedSetOfSports = allSportsResponse['sports'].map(sp => new Sport(sp));

    const mockCache: Cachable = {
      get: (key: string) => Promise.resolve(undefined),
      set: () => {},
      del: undefined
    };

    const gateway: IBetvictorGateway = new BetvictorGateway(mockCache);
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

 it('should return OK with valid response when values are in cache', async function () {

  // theres no need to mock http request when having values in cache
  const mockCache: Cachable = {
    get: (_: string) => Promise.resolve(allSportsResponse),
    set: () => {},
    del: undefined
  };

  const gateway: IBetvictorGateway = new BetvictorGateway(mockCache);
  const res: Sport[] = await gateway.getAllSports()
    .then((res) => res)
    .then(sports => sports.map(sp => new Sport(sp)))
    .catch((e) => { throw e; });

  const expectedSetOfSports = allSportsResponse['sports'].map(sp => new Sport(sp));

  assert.equal(expectedSetOfSports.length, res.length);
  const sportInst: Sport = expectedSetOfSports[0];
  assert.equal(sportInst.id, res[0].id);
  assert.equal(sportInst.pos, res[0].pos);
  assert.equal(sportInst.title, res[0].title);
  assert.equal(sportInst.events.length, res[0].events.length);
});
});
