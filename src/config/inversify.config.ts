import { Container } from "inversify";
import "reflect-metadata";
import { Registrable } from "../1presentation/controllers/Registrable";
import { SportsController } from '../1presentation/controllers/SportsController';
import { SportService } from "../2application/services/impl/SportService";
import { ISportService } from "../2application/services/interfaces/ISportService";
import { BetvictorGateway } from "../3infrastructure/impl/BetvictorGateway";
import { IBetvictorGateway } from "../3infrastructure/interfaces/IBetvictorGateway";
import TYPES from "./types";


const container = new Container();

// controllers
container.bind<Registrable>(TYPES.Controller).to(SportsController);
container.bind<ISportService>(TYPES.SportService).to(SportService);
container.bind<IBetvictorGateway>(TYPES.BetvictorGateway).to(BetvictorGateway);


export default container;