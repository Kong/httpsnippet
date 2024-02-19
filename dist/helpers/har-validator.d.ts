import { ErrorObject } from 'ajv';
import { Request } from 'har-format';
export declare class HARError extends Error {
    name: string;
    message: string;
    errors: ErrorObject[];
    constructor(errors: ErrorObject[]);
}
export declare const validateHarRequest: (request: any) => request is Request;
//# sourceMappingURL=har-validator.d.ts.map