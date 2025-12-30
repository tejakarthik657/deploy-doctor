"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DependencyUpdateRule = void 0;
class DependencyUpdateRule {
    constructor() {
        this.name = 'dependency-updates';
        this.description = 'Checks for outdated dependencies';
    }
    async check(projectPath, packageManager) {
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
exports.DependencyUpdateRule = DependencyUpdateRule;
//# sourceMappingURL=dependency-update-rule.js.map