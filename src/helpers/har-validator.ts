import Ajv, { ErrorObject } from "ajv";
import * as schema from 'har-schema';

export class HARError extends Error {
  name = 'HARError';
  message = 'validation failed';
  errors: ErrorObject[] = [];
  constructor(errors: ErrorObject[]) {
    super();
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor)
  }
}

const ajv = new Ajv({
  allErrors: true,
});
ajv.addSchema(schema);

interface Commentable {
  comment?: string;
}

interface HarCookie extends Commentable {
  name: string;
  value: string;
  type?: string;
  domain?: string;
  expires?: string | null;
  httpOnly?: boolean;
  secure?: boolean;
}

interface HarHeader extends Commentable {
  name: string;
  value: string;
}

interface HarQuery extends Commentable {
  name: string;
  value: string;
}

interface HarPostDataParam extends Commentable {
  name?: string;
  value?: string;
  fileName?: string;
  contentType?: string;
}

interface HarPostData extends Commentable {
  mimeType: string;
  text?: string;
  params: HarPostDataParam[];
}

export interface HarRequest extends Commentable {
  method: string;
  url: string;
  httpVersion: string;
  cookies: HarCookie[];
  headers: HarHeader[];
  queryString: HarQuery[];
  postData?: HarPostData;
  headersSize: number;
  bodySize: number;
}

export const validateHarRequest = (request: any): request is HarRequest => {
  const validate = ajv.getSchema('request.json');
  if (!validate) {
    throw new Error('failed to find HAR request schema');
  }
  const valid = validate(request);
  if (!valid) {
    throw new HARError(validate.errors!);
  }
  return true;
}
