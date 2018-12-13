import { inject, injectable } from "inversify";
import "reflect-metadata";
import { IBetvictorGateway } from "../../../3infrastructure/interfaces/IBetvictorGateway";
import TYPES from '../../../config/types';
import { Event } from "../../domain/Event";
import { Sport } from "../../domain/Sport";
import { ISportService } from "../interfaces/ISportService";

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
        .then(sports => sports.map(sp => new Sport(JSON.parse(sp))))
        .then(sports => resolve(sports))
        .catch((e) => { reject(e); });
    });
  }

  getEvents(sportId: number): Promise<Event[]> {
    return new Promise(async (resolve, reject) => {
      return await this.gateway.getAllSports()
        .then((res) => res)
        .then(sports => sports.map(sp => new Sport(JSON.parse(sp))))
        .then(sports => sports.find(sp => sp.id === sportId).events)
        .then(events => resolve(events))
        .catch((e) => { reject(e); });
    });
  }

  getEvent(sportId: number, eventId: number): Promise<Event> {
    return new Promise(async (resolve, reject) => {
      return await this.gateway.getAllSports()
        .then((res) => res)
        .then(sports => sports.map(sp => new Sport(JSON.parse(sp))))
        .then(sports => sports.find(sp => sp.id === sportId).events)
        .then(events => {
          const evt = events.find(evt => evt.id === eventId);
          if (evt == undefined) {
            throw new Error(`Event with id ${eventId} not found.`);
          } else {
            return evt;
          }
        })
        .then(event => resolve(event))
        .catch((e) => { reject(e); });
    });
  }
}