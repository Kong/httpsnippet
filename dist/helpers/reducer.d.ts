export declare type ReducedHelperObject = Record<string, string[] | string>;
export declare const reducer: <T extends {
    name: string;
    value: string;
}>(accumulator: ReducedHelperObject, pair: T) => ReducedHelperObject;
//# sourceMappingURL=reducer.d.ts.map