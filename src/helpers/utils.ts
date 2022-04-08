import { TargetId, targets, TargetInfo, ClientInfo } from '../targets';

export interface AvailableTarget extends TargetInfo {
  clients: ClientInfo[];
}

export const availableTargets = () =>
  Object.keys(targets).map<AvailableTarget>(targetId => ({
    ...targets[targetId as TargetId].info,
    clients: Object.keys(targets[targetId as TargetId])
      .filter(key => !['info', 'index'].includes(key))
      .map(clientId => targets[targetId as TargetId].clientsById[clientId].info),
  }));

export const extname = (targetId: TargetId) => targets[targetId]?.info.extname || '';