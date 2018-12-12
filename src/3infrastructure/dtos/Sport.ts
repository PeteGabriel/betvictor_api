import { Events } from "./Event";

export class Sport {
  public readonly id: number;
  public readonly title: string;
  public readonly meetings: null[] | null;
  public readonly is_virtual: boolean;
  public readonly events: Events[] | null;
  public readonly pos: number;

  public constructor(d: any) {
    this.id = d.id;
    this.title = d.title;
    this.meetings = d.meetings;
    this.is_virtual = d.is_virtual;
    this.events = d.events;
    this.pos = d.pos;
  }
}



