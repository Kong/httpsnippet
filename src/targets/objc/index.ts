import { Target } from '..';
import { nsurlsession } from './nsurlsession';

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
