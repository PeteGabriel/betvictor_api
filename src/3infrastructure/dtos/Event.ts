import { Outcomes } from "./Outcomes";

export class Events {
  public readonly id: number;
  public readonly is_virtual: boolean;
  public readonly outcomes: (Outcomes | null)[] | null;
  public readonly event_id: number;
  public readonly title: string;
  public readonly market_id: number | null;
  public readonly market_type_id: number | null;
  public readonly status_id: number | null;
  public readonly score: string;
  public readonly description: undefined;
  public readonly start_time: number;
  public readonly meeting: string;
  public readonly meeting_id: number;
  public readonly media: undefined;
  public readonly american_format: boolean;
  public readonly event_type: string;
  public readonly pos: number;
  public readonly home_team: string;
  public readonly away_team: string;
  public readonly team_information: boolean;
  public readonly home_score: number;
  public readonly away_score: number;
  public readonly period_id: number;
  public readonly status_type: string;
  public readonly status: string;
  public readonly total_outcomes: number;

  public constructor(d: any) {
    this.id = d.id;
    this.is_virtual = d.is_virtual;
    this.outcomes = d.outcomes;
    this.event_id = d.event_id;
    this.title = d.title;
    this.market_id = d.market_id;
    this.market_type_id = d.market_type_id;
    this.status_id = d.status_id;
    this.score = d.score;
    this.description = d.description;
    this.start_time = d.start_time;
    this.meeting = d.meeting;
    this.meeting_id = d.meeting_id;
    this.media = d.media;
    this.american_format = d.american_format;
    this.event_type = d.event_type;
    this.pos = d.pos;
    this.home_team = d.home_team;
    this.away_team = d.away_team;
    this.team_information = d.team_information;
    this.home_score = d.home_score;
    this.away_score = d.away_score;
    this.period_id = d.period_id;
    this.status_type = d.status_type;
    this.status = d.status;
    this.total_outcomes = d.total_outcomes;
  }
}