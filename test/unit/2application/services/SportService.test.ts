import "reflect-metadata";
import { SportService } from '../../../../src/2application/services/impl/SportService';
import { ISportService } from '../../../../src/2application/services/interfaces/ISportService';
import { IBetvictorGateway } from '../../../../src/3infrastructure/interfaces/IBetvictorGateway';
const assert = require('assert');



it('should return an array of Sport instances', async function () {

  const getAllSports: IBetvictorGateway = {
    getAllSports: function(): Promise<String[]> {
      return new Promise((res, rej) => res([""]));
    }
  };

  const svc: ISportService = new SportService(getAllSports);

  const sports = await svc.getSports().then(sp => sp).catch(e => { throw e; });
  assert.equal(sports.length, 1);
});

it('should return an empty array to fail safe in case of error', async function () {

  const getAllSports: IBetvictorGateway = {
    getAllSports: function(): Promise<String[]> {
      return new Promise((res, rej) => rej());
    }
  };

  const svc: ISportService = new SportService(getAllSports);

  const sports = await svc.getSports().then(sp => sp).catch(e => { return []; });
  assert.equal(sports.length, 0);
});




