import { Rule, Issue, PackageManager } from '../types';
export declare class DependencyUpdateRule implements Rule {
    name: string;
    description: string;
    check(projectPath: string, packageManager: PackageManager): Promise<Issue[]>;
}
//# sourceMappingURL=dependency-update-rule.d.ts.map