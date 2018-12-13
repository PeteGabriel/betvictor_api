import { IBetvictorGateway } from '../../../src/3infrastructure/interfaces/IBetvictorGateway';

const predefinedSport = require('../mock_data/all_sports.json');

export const mockGateway: IBetvictorGateway = {
    getAllSports: function(): Promise<string[]> {
        return new Promise((res, rej) => res([JSON.stringify(predefinedSport)]));
    }
};