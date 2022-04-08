import { ClientInfo, TargetId, TargetInfo, targets } from '../targets/targets';

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

export const extname = (targetId: TargetId) => targets[targetId]?.info.extname || '';
