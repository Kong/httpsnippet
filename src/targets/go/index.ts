import { Target } from "..";
import { native } from './native'

export const go: Target = {
  info: {
    key: 'go',
    title: 'Go',
    extname: '.go',
    default: 'native',
  },
  clientsById: {
    native,
  }
};
