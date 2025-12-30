"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.NpmPackageManager = void 0;
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
class NpmPackageManager {
    constructor() {
        this.name = 'npm';
    }
    detect(projectPath) {
        const packageJsonPath = path.join(projectPath, 'package.json');
        return fs.existsSync(packageJsonPath);
    }
    async getDependencies(projectPath) {
        const packageJsonPath = path.join(projectPath, 'package.json');
        if (!fs.existsSync(packageJsonPath)) {
            return [];
        }
        const packageJson = await fs.readJson(packageJsonPath);
        const deps = [];
        if (packageJson.dependencies) {
            for (const [name, version] of Object.entries(packageJson.dependencies)) {
                deps.push({ name, version: version, type: 'prod' });
            }
        }
        if (packageJson.devDependencies) {
            for (const [name, version] of Object.entries(packageJson.devDependencies)) {
                deps.push({ name, version: version, type: 'dev' });
            }
        }
        if (packageJson.peerDependencies) {
            for (const [name, version] of Object.entries(packageJson.peerDependencies)) {
                deps.push({ name, version: version, type: 'peer' });
            }
        }
        return deps;
    }
    async getScripts(projectPath) {
        const packageJsonPath = path.join(projectPath, 'package.json');
        if (!fs.existsSync(packageJsonPath)) {
            return {};
        }
        const packageJson = await fs.readJson(packageJsonPath);
        return packageJson.scripts || {};
    }
    async getMetadata(projectPath) {
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
exports.NpmPackageManager = NpmPackageManager;
//# sourceMappingURL=npm.js.map