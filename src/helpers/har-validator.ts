import Ajv, { ErrorObject } from 'ajv';
import { Request } from 'har-format';
import * as schema from 'har-schema';

export class HARError extends Error {
  name = 'HARError';
  message = 'validation failed';
  errors: ErrorObject[] = [];
  constructor(errors: ErrorObject[]) {
    super();
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }
}

const ajv = new Ajv({
  allErrors: true,
});
ajv.addSchema(schema);

export const validateHarRequest = (request: any): request is Request => {
  const validate = ajv.getSchema('request.json');
  if (!validate) {
    throw new Error('failed to find HAR request schema');
  }
  const valid = validate(request);
  if (!valid && validate.errors) {
    throw new HARError(validate.errors);
  }
  return true;
};
