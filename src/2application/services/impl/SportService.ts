import { ISportService } from "../interfaces/ISportService";
import { Sport } from "../../domain/Sport";
import { inject, injectable } from "inversify";
import { IBetvictorGateway } from "../../../3infrastructure/interfaces/IBetvictorGateway";
import TYPES from '../../../config/types';
import "reflect-metadata";

@injectable()
export class SportService implements ISportService {

  @inject(TYPES.BetvictorGateway)
  private gateway: IBetvictorGateway;

  constructor(gate: IBetvictorGateway) {
    this.gateway = gate;
  }

  getSports(): Promise<Sport[]> {
    return new Promise(async (resolve, reject) => {
      return await this.gateway.getAllSports()
        .then((res) => res)
        .then(sports => sports.map(sp => new Sport(sp)))
        .then(sports => resolve(sports))
        .catch((e) => { reject(e); });
    });
  }
}