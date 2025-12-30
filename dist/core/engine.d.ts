import { Issue, Rule } from '../types';
export declare class DeployDoctorEngine {
    private rules;
    constructor(rules: Rule[]);
    run(projectPath: string): Promise<Issue[]>;
}
//# sourceMappingURL=engine.d.ts.map