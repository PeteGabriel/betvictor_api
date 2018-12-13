import { injectable } from "inversify";
import { HttpError } from "../../2application/domain/errors/HttpError";
import { IBetvictorGateway } from "../interfaces/IBetvictorGateway";
const http = require("http");

@injectable()
export class BetvictorGateway implements IBetvictorGateway {

  readonly BetvictorUri = 'http://www.betvictor.com/live/en/live/list.json';

  getAllSports(): Promise<string[]> {
    return new Promise((resolve, reject) => {
      http.get(this.BetvictorUri, (res) => {
        const { statusCode, statusMessage } = res;
        let error;
        if (statusCode !== 200) {
          error = new HttpError(statusCode, statusMessage);
          reject(error);
          return;
        }
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(rawData);
            resolve(parsedData['sports']);
          }
          catch (e) {
            reject(e);
          }
        });
      }).on('error', (e) => {
        reject(e);
        return;
      });
    });
  }
}