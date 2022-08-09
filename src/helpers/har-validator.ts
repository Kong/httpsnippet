import { Request } from 'har-format';
import { validateRequest } from 'har-validator-compiled';

export const validateHarRequest = (request: any): request is Request => {
  return validateRequest(request);
};
