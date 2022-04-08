import { Request } from '..';
import { CodeBuilderOptions } from '../helpers/code-builder';
import { c } from './c';
import { clojure } from './clojure';
import { csharp } from './csharp';
import { go } from './go';
import { http } from './http';
import { java } from './java';
import { javascript } from './javascript';
import { kotlin } from './kotlin';
import { node } from './node';
// import { objc } from './objc';
// import { ocaml } from './ocaml';
// import { php } from './php';
// import { powershell } from './powershell';
// import { python } from './python';
// import { r } from './r';
// import { ruby } from './ruby';
// import { shell } from './shell';
// import { swift } from './swift';

export type TargetId = keyof typeof targets;

export type ClientId = string;

export interface ClientInfo {
  key: ClientId;
  title: string;
  link: string;
  description: string;
}

export type Converter<T extends Record<string, any> & CodeBuilderOptions> = (request: Request, options?: T) => string;

export interface Client<T extends Record<string, any> & CodeBuilderOptions = CodeBuilderOptions> {
  info: ClientInfo;
  convert: Converter<T>;
}

export type Extension = `.${string}` | null;

export interface TargetInfo {
  key: TargetId;
  title: string;
  extname: Extension;
  default: string;
}

export type Target = {
  info: TargetInfo;
  clientsById: Record<ClientId, Client>;
};

export const targets = {
  c,
  clojure,
  csharp,
  go,
  http,
  java,
  javascript,
  kotlin,
  node,
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
