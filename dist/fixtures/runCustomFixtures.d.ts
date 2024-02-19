import { Request } from '../httpsnippet';
import { ClientId, TargetId } from '../targets/targets';
export interface CustomFixture {
    targetId: TargetId;
    clientId: ClientId;
    tests: {
        it: string;
        input: Request;
        options: any;
        /** a file path pointing to the expected custom fixture result */
        expected: string;
    }[];
}
export declare const runCustomFixtures: ({ targetId, clientId, tests }: CustomFixture) => void;
//# sourceMappingURL=runCustomFixtures.d.ts.map