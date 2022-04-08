import { Request } from '..';
import { c } from './c';
// import * as clojure from './clojure';
// import * as csharp from './csharp';
// import * as go from './go';
// import * as http from './http';
// import * as java from './java';
// import * as javascript from './javascript';
// import * as kotlin from './kotlin';
// import * as node from './node';
// import * as objc from './objc';
// import * as ocaml from './ocaml';
// import * as php from './php';
// import * as powershell from './powershell';
// import * as python from './python';
// import * as r from './r';
// import * as ruby from './ruby';
// import * as shell from './shell';
// import * as swift from './swift';

export type TargetId = keyof typeof targets;

export type ClientId = string;

export interface ClientInfo {
  key: ClientId;
  title: string;
  link: string;
  description: string;
}

export type Converter = (request: Request, options?: any) => string;

export interface Client {
  info: ClientInfo;
  convert: Converter;
}

export type Extension = `.${string}`;

export interface TargetInfo {
  key: TargetId;
  title: string;
  extname: Extension;
  default: string;
}

export type Target = {
  info: TargetInfo;
  clientsById: Record<ClientId, Client>;
}

export const targets = {
  c,
  // clojure,
  // csharp,
  // go,
  // http,
  // java,
  // javascript,
  // kotlin,
  // node,
  // objc,
  // ocaml,
  // php,
  // powershell,
  // python,
  // r,
  // ruby,
  // shell,
  // swift,
};