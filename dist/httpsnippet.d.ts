/// <reference types="node" />
import { Param, PostDataCommon, Request as NpmHarRequest } from 'har-format';
import { UrlWithParsedQuery } from 'url';
import { ReducedHelperObject } from './helpers/reducer';
import { TargetId } from './targets/targets';
export { availableTargets, extname } from './helpers/utils';
export { addTarget, addTargetClient } from './targets/targets';
/** is this wrong?  yes.  according to the spec (http://www.softwareishard.com/blog/har-12-spec/#postData) it's technically wrong since `params` and `text` are (by the spec) mutually exclusive.  However, in practice, this is not what is often the case.
 *
 * In general, this library takes a _descriptive_ rather than _perscriptive_ approach (see https://amyrey.web.unc.edu/classes/ling-101-online/tutorials/understanding-prescriptive-vs-descriptive-grammar/).
 *
 * Then, in addition to that, it really adds to complexity with TypeScript (TypeScript takes this constraint very very seriously) in a way that's not actually super useful.  So, we treat this object as though it could have both or either of `params` and/or `text`.
 */
declare type PostDataBase = PostDataCommon & {
    text?: string;
    params?: Param[];
};
export declare type HarRequest = Omit<NpmHarRequest, 'postData'> & {
    postData: PostDataBase;
};
export interface RequestExtras {
    postData: PostDataBase & {
        jsonObj?: ReducedHelperObject;
        paramsObj?: ReducedHelperObject;
        boundary?: string;
    };
    fullUrl: string;
    queryObj: ReducedHelperObject;
    headersObj: ReducedHelperObject;
    uriObj: UrlWithParsedQuery;
    cookiesObj: ReducedHelperObject;
    allHeaders: ReducedHelperObject;
}
export declare type Request = HarRequest & RequestExtras;
interface Entry {
    request: Partial<HarRequest>;
}
interface HarEntry {
    log: {
        version: string;
        creator: {
            name: string;
            version: string;
        };
        entries: Entry[];
    };
}
export declare class HTTPSnippet {
    requests: Request[];
    constructor(input: HarEntry | HarRequest);
    prepare: (harRequest: HarRequest) => {
        allHeaders: {
            [x: string]: string | string[];
        };
        fullUrl: string;
        url: string;
        uriObj: {
            query: ReducedHelperObject;
            search: string;
            path: string | null;
            auth: string | null;
            hash: string | null;
            host: string | null;
            hostname: string | null;
            href: string;
            pathname: string | null;
            protocol: string | null;
            slashes: boolean | null;
            port: string | null;
        };
        headers: import("har-format").Header[];
        comment?: string | undefined;
        method: string;
        httpVersion: string;
        cookies: import("har-format").Cookie[];
        queryString: import("har-format").QueryString[];
        headersSize: number;
        bodySize: number;
        postData: PostDataCommon & {
            text?: string | undefined;
            params?: Param[] | undefined;
        } & {
            jsonObj?: ReducedHelperObject | undefined;
            paramsObj?: ReducedHelperObject | undefined;
            boundary?: string | undefined;
        };
        queryObj: ReducedHelperObject;
        headersObj: ReducedHelperObject;
        cookiesObj: ReducedHelperObject;
    };
    convert: (targetId: TargetId, clientId?: string | undefined, options?: any) => string | false | string[];
}
//# sourceMappingURL=httpsnippet.d.ts.map