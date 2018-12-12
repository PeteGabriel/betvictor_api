import { Sport } from "../dtos/Sport";


export interface IBetvictorGateway {
  getAllSports(): Promise<Sport>;
}