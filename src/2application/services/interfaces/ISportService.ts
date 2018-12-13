import { Sport } from '../../domain/Sport';
// import { Event } from "src/2application/domain/Event";

export interface ISportService {
  getSports(): Promise<Sport[]>;
  // getEvents(): Promise<Event[]>;
}