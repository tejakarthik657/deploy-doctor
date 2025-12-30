import { Issue, PackageManager, Rule } from '../types';
import { detectPackageManager } from '../package-managers';

export class DeployDoctorEngine {
  constructor(private rules: Rule[]) {}

  async run(projectPath: string): Promise<Issue[]> {
    const packageManager = detectPackageManager(projectPath);
    if (!packageManager) {
      return [{
        rule: 'package-manager',
        message: 'No supported package manager detected',
        severity: 'error',
      }];
    }

    const issues: Issue[] = [];

    for (const rule of this.rules) {
      try {
        const ruleIssues = await rule.check(projectPath, packageManager);
        issues.push(...ruleIssues);
      } catch (error) {
        issues.push({
          rule: rule.name,
          message: `Error running rule: ${(error as Error).message}`,
          severity: 'error',
        });
      }
    }

    return issues;
  }
}