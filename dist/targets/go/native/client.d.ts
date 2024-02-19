/**
 * @description
 * HTTP code snippet generator for native Go.
 *
 * @author
 * @montanaflynn
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */
import { Client } from '../../targets';
export interface GoNativeOptions {
    showBoilerplate?: boolean;
    checkErrors?: boolean;
    printBody?: boolean;
    timeout?: number;
    insecureSkipVerify?: boolean;
}
export declare const native: Client<GoNativeOptions>;
//# sourceMappingURL=client.d.ts.map