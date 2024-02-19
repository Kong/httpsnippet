import { ClientInfo, TargetId, TargetInfo } from '../targets/targets';
export interface AvailableTarget extends TargetInfo {
    clients: ClientInfo[];
}
export declare const availableTargets: () => AvailableTarget[];
export declare const extname: (targetId: TargetId) => "" | `.${string}`;
//# sourceMappingURL=utils.d.ts.map