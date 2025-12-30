import { Rule, Issue, PackageManager } from '../types';

export class StartScriptRule implements Rule {
  name = 'start-script';
  description = 'Checks if a start script is defined in package.json';

  async check(projectPath: string, packageManager: PackageManager): Promise<Issue[]> {
    const scripts = await packageManager.getScripts(projectPath);
    if (!scripts.start) {
      return [{
        rule: this.name,
        message: 'No start script found. Consider adding a start script to package.json.',
        severity: 'info',
      }];
    }
    return [];
  }
}