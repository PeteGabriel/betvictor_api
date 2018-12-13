import { Event } from '../../domain/Event';
import { Sport } from '../../domain/Sport';

export interface ISportService {
  getSports(): Promise<Sport[]>;
  getEvents(sportId: number): Promise<Event[]>;
}