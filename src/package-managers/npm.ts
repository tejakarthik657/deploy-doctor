import * as fs from 'fs-extra';
import * as path from 'path';
import { PackageManager, Dependency } from '../types';

export class NpmPackageManager implements PackageManager {
  name = 'npm';

  detect(projectPath: string): boolean {
    const packageJsonPath = path.join(projectPath, 'package.json');
    return fs.existsSync(packageJsonPath);
  }

  async getDependencies(projectPath: string): Promise<Dependency[]> {
    const packageJsonPath = path.join(projectPath, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      return [];
    }

    const packageJson = await fs.readJson(packageJsonPath);
    const deps: Dependency[] = [];

    if (packageJson.dependencies) {
      for (const [name, version] of Object.entries(packageJson.dependencies)) {
        deps.push({ name, version: version as string, type: 'prod' });
      }
    }

    if (packageJson.devDependencies) {
      for (const [name, version] of Object.entries(packageJson.devDependencies)) {
        deps.push({ name, version: version as string, type: 'dev' });
      }
    }

    if (packageJson.peerDependencies) {
      for (const [name, version] of Object.entries(packageJson.peerDependencies)) {
        deps.push({ name, version: version as string, type: 'peer' });
      }
    }

    return deps;
  }

  async getScripts(projectPath: string): Promise<Record<string, string>> {
    const packageJsonPath = path.join(projectPath, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      return {};
    }

    const packageJson = await fs.readJson(packageJsonPath);
    return packageJson.scripts || {};
  }

  async getMetadata(projectPath: string): Promise<{ name?: string; version?: string }> {
    const packageJsonPath = path.join(projectPath, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      return {};
    }

    const packageJson = await fs.readJson(packageJsonPath);
    return {
      name: packageJson.name,
      version: packageJson.version,
    };
  }
}