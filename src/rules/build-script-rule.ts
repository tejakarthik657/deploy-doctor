import { Rule, Issue, PackageManager } from '../types';

export class BuildScriptRule implements Rule {
  name = 'build-script';
  description = 'Checks if a build script is defined in package.json';

  async check(projectPath: string, packageManager: PackageManager): Promise<Issue[]> {
    const scripts = await packageManager.getScripts(projectPath);
    if (!scripts.build) {
      return [{
        rule: this.name,
        message: 'No build script found. Consider adding a build script to package.json.',
        severity: 'warning',
      }];
    }
    return [];
  }
}