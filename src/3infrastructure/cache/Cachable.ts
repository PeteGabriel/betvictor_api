export interface Cachable {
  del(keys: string[]);
  get(key: string);
  set(key: string, obj: any, onRetrieve?: Function);
}