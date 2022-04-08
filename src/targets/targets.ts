import { Request } from '../httpsnippet';
import { CodeBuilderOptions } from '../helpers/code-builder';
import { c } from './c/target';
import { clojure } from './clojure/target';
import { csharp } from './csharp/target';
import { go } from './go/target';
import { http } from './http/target';
import { java } from './java/target';
import { javascript } from './javascript/target';
import { kotlin } from './kotlin/target';
import { node } from './node/target';
import { objc } from './objc/target';
import { ocaml } from './ocaml/target';
import { php } from './php/target';
import { powershell } from './powershell/target';
import { python } from './python/target';
import { r } from './r/target';
import { ruby } from './ruby/target';
import { shell } from './shell/target';
import { swift } from './swift/target';

export type TargetId = keyof typeof targets;

export type ClientId = string;

export interface ClientInfo {
  key: ClientId;
  title: string;
  link: string;
  description: string;
}

export type Converter<T extends Record<string, any>> = (request: Request, options?: T & CodeBuilderOptions) => string;

export interface Client<T extends Record<string, any> = Record<string, any>> {
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
  objc,
  ocaml,
  php,
  powershell,
  python,
  r,
  ruby,
  shell,
  swift,
};
