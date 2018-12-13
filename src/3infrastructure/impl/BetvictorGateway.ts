import { injectable, inject } from "inversify";
import { HttpError } from "../../2application/domain/errors/HttpError";
import { IBetvictorGateway } from "../interfaces/IBetvictorGateway";
import TYPES from "../config/types";
import { Cachable } from "../cache/Cachable";
const http = require("http");

@injectable()
export class BetvictorGateway implements IBetvictorGateway {

  @inject(TYPES.Cache)
  private cache: Cachable;

  readonly BetvictorUri = 'http://www.betvictor.com/live/en/live/list.json';

  readonly allSportsResponseKey = "allSportsResponseKey";

  constructor(@inject(TYPES.Cache) cache: Cachable) {
    this.cache = cache;
  }

  getAllSports(): Promise<string[]> {
    return new Promise(async (resolve, reject) => {

      await this.cache.get(this.allSportsResponseKey)
        .then(res => {
          if (res) {
            return resolve(res['sports']);
          }
        });

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
            this.cache.set(this.allSportsResponseKey, parsedData);
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