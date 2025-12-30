import { PackageManager } from '../types';
import { NpmPackageManager } from './npm';

const packageManagers: PackageManager[] = [
  new NpmPackageManager(),
  // Add more: new YarnPackageManager(), etc.
];

export function detectPackageManager(projectPath: string): PackageManager | null {
  for (const pm of packageManagers) {
    if (pm.detect(projectPath)) {
      return pm;
    }
  }
  return null;
}

export { NpmPackageManager };