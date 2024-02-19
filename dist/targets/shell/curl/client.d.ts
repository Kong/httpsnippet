/**
 * @description
 *
 * HTTP code snippet generator for the Shell using cURL.
 *
 * @author
 * @AhmadNassri
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */
import { Client } from '../../targets';
export interface CurlOptions {
    binary?: boolean;
    globOff?: boolean;
    indent?: string | false;
    insecureSkipVerify?: boolean;
    prettifyJson?: boolean;
    short?: boolean;
}
export declare const curl: Client<CurlOptions>;
//# sourceMappingURL=client.d.ts.map