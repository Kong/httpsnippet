import { Merge } from 'type-fest';
import { CodeBuilderOptions } from '../helpers/code-builder';
import { Request } from '../httpsnippet';
export declare type TargetId = keyof typeof targets;
export declare type ClientId = string;
export interface ClientInfo {
    key: ClientId;
    title: string;
    link: string;
    description: string;
}
export declare type Converter<T extends Record<string, any>> = (request: Request, options?: Merge<CodeBuilderOptions, T>) => string;
export interface Client<T extends Record<string, any> = Record<string, any>> {
    info: ClientInfo;
    convert: Converter<T>;
}
export declare type Extension = `.${string}` | null;
export interface TargetInfo {
    key: TargetId;
    title: string;
    extname: Extension;
    default: string;
}
export interface Target {
    info: TargetInfo;
    clientsById: Record<ClientId, Client>;
}
export declare const targets: {
    c: Target;
    clojure: Target;
    csharp: Target;
    go: Target;
    http: Target;
    java: Target;
    javascript: Target;
    kotlin: Target;
    node: Target;
    objc: Target;
    ocaml: Target;
    php: Target;
    powershell: Target;
    python: Target;
    r: Target;
    ruby: Target;
    shell: Target;
    swift: Target;
};
export declare const isTarget: (target: Target) => target is Target;
export declare const addTarget: (target: Target) => void;
export declare const isClient: (client: Client) => client is Client<Record<string, any>>;
export declare const addTargetClient: (targetId: TargetId, client: Client) => void;
//# sourceMappingURL=targets.d.ts.map