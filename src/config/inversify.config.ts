import { Container } from "inversify";
import "reflect-metadata";
import { SportsController } from '../1presentation/controllers/SportsController';
import TYPES from "./types";
import { Registrable } from "../1presentation/controllers/Registrable";
import { SportService } from "../2application/services/impl/SportService";
import { ISportService } from "../2application/services/interfaces/ISportService";


const container = new Container();

// controllers
container.bind<Registrable>(TYPES.Controller).to(SportsController);
container.bind<ISportService>(TYPES.SportService).to(SportService);


export default container;