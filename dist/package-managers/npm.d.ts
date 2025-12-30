import { PackageManager, Dependency } from '../types';
export declare class NpmPackageManager implements PackageManager {
    name: string;
    detect(projectPath: string): boolean;
    getDependencies(projectPath: string): Promise<Dependency[]>;
    getScripts(projectPath: string): Promise<Record<string, string>>;
    getMetadata(projectPath: string): Promise<{
        name?: string;
        version?: string;
    }>;
}
//# sourceMappingURL=npm.d.ts.map