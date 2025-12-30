import { Rule, Issue, PackageManager } from '../types';
export declare class BuildScriptRule implements Rule {
    name: string;
    description: string;
    check(projectPath: string, packageManager: PackageManager): Promise<Issue[]>;
}
//# sourceMappingURL=build-script-rule.d.ts.map