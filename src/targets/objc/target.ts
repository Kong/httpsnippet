import { Target } from '../targets';
import { nsurlsession } from './nsurlsession/client';

export const objc: Target = {
  info: {
    key: 'objc',
    title: 'Objective-C',
    extname: '.m',
    default: 'nsurlsession',
  },
  clientsById: {
    nsurlsession,
  },
};
