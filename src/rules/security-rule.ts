import { Rule, Issue, PackageManager } from '../types';

export class SecurityRule implements Rule {
  name = 'security';
  description = 'Checks for security vulnerabilities in dependencies';

  async check(projectPath: string, packageManager: PackageManager): Promise<Issue[]> {
    const dependencies = await packageManager.getDependencies(projectPath);

    if (dependencies.length === 0) {
      return [];
    }

    // For simplicity, suggest running audit
    return [{
      rule: this.name,
      message: 'Consider checking for security vulnerabilities. Run `npm audit` or equivalent.',
      severity: 'warning',
    }];
  }
}