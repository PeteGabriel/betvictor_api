import { inject, injectable } from "inversify";
import "reflect-metadata";
import { ResourceError } from '../../domain/errors/ResourceError';
import { HttpError } from "../../../2application/domain/errors/HttpError";
import { IBetvictorGateway } from "../../../3infrastructure/interfaces/IBetvictorGateway";
import TYPES from '../../../3infrastructure/config/types';
import { Event } from "../../domain/Event";
import { Sport } from "../../domain/Sport";
import { ISportService } from "../interfaces/ISportService";

@injectable()
export class SportService implements ISportService {

  readonly ForbiddenCode = 403;
  readonly NotFoundCode = 404;

  @inject(TYPES.BetvictorGateway)
  private gateway: IBetvictorGateway;

  constructor(@inject(TYPES.BetvictorGateway) gate: IBetvictorGateway) {
    this.gateway = gate;
  }


  getSports(): Promise<Sport[]> {
    return new Promise(async (resolve, reject) => {
      return await this.gateway.getAllSports()
        .then((res) => {
          if (res != undefined) {
            return res;
          }
          throw new ResourceError(this.NotFoundCode, "Sports not found");
        })
        .then(sports => sports.map(sp => new Sport(sp)))
        .then(sports => resolve(sports))
        .catch(this.handleRejection(reject));
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
            throw new ResourceError(this.NotFoundCode, `Sport with id ${sportId} not found.`);
          } else {
            return sport.events;
          }
        })
        .then(events => resolve(events))
        .catch(this.handleRejection(reject));
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
            throw new ResourceError(this.NotFoundCode, `Sport with id ${sportId} not found.`);
          } else {
            return sport;
          }
        })
        .then(sport => {
          const evt = sport.events.find(evt => evt.id == eventId);
          if (evt == undefined) {
            throw new ResourceError(this.NotFoundCode, `Event with id ${eventId} not found.`);
          } else {
            return evt;
          }
        })
        .then(event => resolve(event))
        .catch(this.handleRejection(reject));
    });
  }

  private handleRejection(reject: (reason?: any) => void): (reason: any) => void | PromiseLike<void> {
    return (e) => {
      if (e instanceof HttpError) {
        if (e.statusCode == this.ForbiddenCode) {
          return reject(new ResourceError(e.statusCode, e.message));
        }
        else if (e.statusCode == this.NotFoundCode) {
          return reject(new ResourceError(e.statusCode, e.message));
        }
      }
      reject(e);
    };
  }
}