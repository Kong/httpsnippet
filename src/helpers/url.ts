import type { ReducedHelperObject } from './reducer';

export function toSearchParams(obj: ReducedHelperObject): URLSearchParams {
  return new URLSearchParams(
    Object.entries(obj)
      .map<[string, string][]>(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map<[string, string]>(v => [key, v]);
        }

        return [[key, value]];
      })
      .flat(1),
  );
}

export class ExtendedURL extends URL {
  get path() {
    return this.pathname + this.search;
  }
}
