const assert = require('assert');
const nock = require('nock');
import { IBetvictorGateway } from "../../../src/3infrastructure/interfaces/IBetvictorGateway";
import { BetvictorGateway } from "../../../src/3infrastructure/impl/BetvictorGateway";

const allSportsResponse = require('./requests/all_sports.json');

let gateway: IBetvictorGateway = undefined;

describe('Requesting all sports', function () {
 it('should return OK with valid response', async function () {

    // mock http request
    nock('http://localhost:3000')
      .get('/api/sports')
      .reply(200, allSportsResponse);

      gateway = new BetvictorGateway();
      const res = await gateway.getAllSports()
        .then((docs) => docs)
        .catch((_) => {return undefined; });

      assert.equal(allSportsResponse, res);
 });
});