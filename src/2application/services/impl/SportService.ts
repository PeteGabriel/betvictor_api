import { inject, injectable } from "inversify";
import "reflect-metadata";
import { ForbiddenResourceError } from '../../../2application/domain/errors/ForbiddenResourceError';
import { HttpError } from "../../../2application/domain/errors/HttpError";
import { IBetvictorGateway } from "../../../3infrastructure/interfaces/IBetvictorGateway";
import TYPES from '../../../config/types';
import { Event } from "../../domain/Event";
import { Sport } from "../../domain/Sport";
import { ISportService } from "../interfaces/ISportService";

@injectable()
export class SportService implements ISportService {

  readonly ForbiddenCode = 403;

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
        .catch((e) => {
          if (e instanceof HttpError) {
            if (e.statusCode == this.ForbiddenCode) {
              reject(new ForbiddenResourceError(e.statusCode, e.message));
            }
          }
          reject(e);
        });
    });
  }

  getEvents(sportId: number): Promise<Event[]> {
    return new Promise(async (resolve, reject) => {
      return await this.gateway.getAllSports()
        .then((res) => res)
        .then(sports => sports.map(sp => new Sport(sp)))
        .then(sports => {
          const sport = sports.find(sp => sp.id == sportId);
          if (sport == undefined) {
            throw new Error(`Sport with id ${sportId} not found.`);
          } else {
            return sport.events;
          }
        })
        .then(events => resolve(events))
        .catch((e) => { reject(e); });
    });
  }

  getEvent(sportId: number, eventId: number): Promise<Event> {
    return new Promise(async (resolve, reject) => {
      return await this.gateway.getAllSports()
        .then((res) => res)
        .then(sports => sports.map(sp => new Sport(sp)))
        .then(sports => {
          const sport = sports.find(sp => sp.id == sportId);
          if (sport == undefined) {
            throw new Error(`Sport with id ${sportId} not found.`);
          } else {
            return sport;
          }
        })
        .then(sport => {
          const evt = sport.events.find(evt => evt.id == eventId);
          if (evt == undefined) {
            throw new Error(`Event with id ${eventId} not found.`);
          } else {
            return evt;
          }
        })
        .then(event => resolve(event))
        .catch((e) => reject(e));
    });
  }
}