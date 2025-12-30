import { Rule, Issue, PackageManager } from '../types';
export declare class StartScriptRule implements Rule {
    name: string;
    description: string;
    check(projectPath: string, packageManager: PackageManager): Promise<Issue[]>;
}
//# sourceMappingURL=start-script-rule.d.ts.map