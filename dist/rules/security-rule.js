"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityRule = void 0;
class SecurityRule {
    constructor() {
        this.name = 'security';
        this.description = 'Checks for security vulnerabilities in dependencies';
    }
    async check(projectPath, packageManager) {
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
exports.SecurityRule = SecurityRule;
//# sourceMappingURL=security-rule.js.map