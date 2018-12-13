import NodeCache = require("node-cache");
import { Cachable } from "./Cachable";
import { injectable } from "inversify";

@injectable()
export default class Cache implements Cachable {

  private cache: NodeCache;

  // one hour of ttl
  constructor(ttlSeconds: number = 60 * 60 * 1) {
    this.cache = new NodeCache({ stdTTL: ttlSeconds });
  }

  set(key: string, obj: any, onRetrieve?: Function) {
    this.cache.set(key, obj, (err, success ) => {
      if (!err && success && onRetrieve) {
        onRetrieve();
      }
    });
  }

  get(key: string) {
    const value = this.cache.get(key);
    return Promise.resolve(value);
  }

  del(keys: string[]) {
    this.cache.del(keys);
  }
}
