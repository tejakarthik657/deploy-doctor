export interface Dependency {
  name: string;
  version: string;
  type: 'prod' | 'dev' | 'peer';
}

export interface Issue {
  rule: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
  file?: string;
  line?: number;
  column?: number;
}

export interface PackageManager {
  name: string;
  detect(projectPath: string): boolean;
  getDependencies(projectPath: string): Promise<Dependency[]>;
  getScripts(projectPath: string): Promise<Record<string, string>>;
  getMetadata(projectPath: string): Promise<{ name?: string; version?: string }>;
}

export interface Rule {
  name: string;
  description: string;
  check(projectPath: string, packageManager: PackageManager): Promise<Issue[]>;
}