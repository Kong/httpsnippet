import type { ClientId, ClientInfo, TargetId, TargetInfo } from '../targets/index.js';

import { targets } from '../targets/index.js';

export interface AvailableTarget extends TargetInfo {
  clients: ClientInfo[];
}

export const availableTargets = () =>
  Object.keys(targets).map<AvailableTarget>(targetId => ({
    ...targets[targetId as TargetId].info,
    clients: Object.keys(targets[targetId as TargetId].clientsById).map(
      clientId => targets[targetId as TargetId].clientsById[clientId].info,
    ),
  }));

export const extname = (targetId: TargetId, clientId: ClientId) => {
  const target = targets[targetId];
  if (!target) {
    return '';
  }

  return target.clientsById[clientId]?.info.extname || '';
};
