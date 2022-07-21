import type { ErrorObject } from 'ajv';
import type { Request } from 'har-format';
import Ajv from 'ajv';
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
    if (validate.errors.length === 1) {
      // While not ideal, or compliant with the HAR spec, if we have an empty `postData` object in
      // our HAR and no other errors we should let this through because it's fine and our client
      // targets are able to handle it okay.
      const error = validate.errors[0];
      if (
        error.dataPath === '.postData' &&
        error.message === "should have required property 'mimeType'" &&
        JSON.stringify(request.postData) === '{}'
      ) {
        return true;
      }
    }

    throw new HARError(validate.errors);
  }

  return true;
};
