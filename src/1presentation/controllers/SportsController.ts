import { inject, injectable } from "inversify";
import { ResourceError } from '../../2application/domain/errors/ResourceError';
import { Sport } from "../../2application/domain/Sport";
import { ISportService } from '../../2application/services/interfaces/ISportService';
import TYPES from '../../config/types';
import { Problem, ProblemJsonMediaType } from "../responses/Problem";
import { Event } from "./../../2application/domain/Event";
import { Registrable } from "./Registrable";
import express = require("express");

@injectable()
export class SportsController implements Registrable {

  readonly ListAllSportsUri = "/api/sports";
  readonly ListAllEventsForSportUri = "/api/sports/:id/events";
  readonly ListAllDataForEvent = "/api/sports/:id/events/:eid";

  @inject(TYPES.SportService)
  private sportsService: ISportService;

  constructor(@inject(TYPES.SportService) sportsService: ISportService) {
    this.sportsService = sportsService;
  }


  register(app: express.Application): void {
    app.route(this.ListAllSportsUri)
        .get(this.getAllSports());
    app.route(this.ListAllEventsForSportUri)
        .get(this.getAllEvents());
    app.route(this.ListAllDataForEvent)
        .get(this.getEventById());
  }

  private getAllSports(): express.RequestHandler {
    return async (_: express.Request, res: express.Response) => {

      const onRes = (data) => {
        res.status(200).send(data);
        return data;
      };

      const onErr = (err) =>  {
        if (err instanceof ResourceError) {
          const response = new Problem(err.code,
            "",
            "Access to the resource was forbidden.",
             err.message);
          res.status(err.code).type(ProblemJsonMediaType).send(response);
          return;
        }
        res.status(500).send(err);
        return;
      };

      this.getSports(onRes, onErr);
    };
  }

  private getAllEvents(): express.RequestHandler {
    return async (req: express.Request, res: express.Response) => {

      const onRes = (data) => {
        res.status(200).send(data);
        return data;
      };

      const onErr = (err) =>  {
        if (err instanceof ResourceError) {
          const response = new Problem(err.code,
            "",
            "Access to the resource was forbidden.",
             err.message);
          res.status(err.code).type(ProblemJsonMediaType).send(response);
          return;
        }
        res.status(500).send(err);
        return;
      };

      this.getEvents(req.params.id, onRes, onErr);
    };
  }

  private getEventById(): express.RequestHandler {
    return async (req: express.Request, res: express.Response) => {

      const onRes = (data) => {
        res.status(200).send(data);
        return data;
      };

      const onErr = (err) =>  {
        if (err instanceof ResourceError) {
          const response = new Problem(err.code,
            "",
            "Access to the resource was forbidden.",
             err.message);
          res.status(err.code).type(ProblemJsonMediaType).send(response);
          return;
        }
        res.status(500).send(err);
        return;
      };

      this.getEvent(req.params.id, req.params.eid, onRes, onErr);
    };
  }

  public async getSports(onResult: (data: Sport[]) => Sport[], onError: (err: any) => any): Promise<Sport[]> {
    return await this.sportsService.getSports()
      .then((data) => {
        return onResult(data);
      })
      .catch((err) => {
        return onError(err);
      });
  }

  public async getEvents(sportId: number, onResult: (data: Event[]) => Event[], onError: (err: any) => any): Promise<Event[]> {
    return await this.sportsService.getEvents(sportId)
      .then((data) => {
        return onResult(data);
      })
      .catch((err) => {
        return onError(err);
      });
  }

  public async getEvent(sportId: number, eventId: number, onResult: (data: Event) => Event, onError: (err: any) => any): Promise<Event> {
    return await this.sportsService.getEvent(sportId, eventId)
      .then((data) => {
        return onResult(data);
      })
      .catch((err) => {
        return onError(err);
      });
  }
}