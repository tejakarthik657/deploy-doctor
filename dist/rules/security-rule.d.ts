import { Rule, Issue, PackageManager } from '../types';
export declare class SecurityRule implements Rule {
    name: string;
    description: string;
    check(projectPath: string, packageManager: PackageManager): Promise<Issue[]>;
}
//# sourceMappingURL=security-rule.d.ts.map