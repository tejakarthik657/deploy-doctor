import { Rule, Issue, PackageManager } from '../types';

export class DependencyUpdateRule implements Rule {
  name = 'dependency-updates';
  description = 'Checks for outdated dependencies';

  async check(projectPath: string, packageManager: PackageManager): Promise<Issue[]> {
    const dependencies = await packageManager.getDependencies(projectPath);
    const prodDeps = dependencies.filter(d => d.type === 'prod');

    if (prodDeps.length === 0) {
      return [];
    }

    // For simplicity, suggest checking updates
    return [{
      rule: this.name,
      message: 'Consider checking for outdated dependencies. Run `npm outdated` or equivalent.',
      severity: 'info',
    }];
  }
}