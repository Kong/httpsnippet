/// <reference types="node" />
declare const url: "http://mockbin.com/har?foo=bar&foo=baz&baz=abc&key=value";
declare namespace options {
    const method: string;
    const headers: {
        cookie: string;
        accept: string;
        'content-type': string;
    };
    const body: import("url").URLSearchParams;
}
//# sourceMappingURL=full.d.ts.map