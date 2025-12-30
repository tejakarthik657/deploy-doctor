"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NpmPackageManager = void 0;
exports.detectPackageManager = detectPackageManager;
const npm_1 = require("./npm");
Object.defineProperty(exports, "NpmPackageManager", { enumerable: true, get: function () { return npm_1.NpmPackageManager; } });
const packageManagers = [
    new npm_1.NpmPackageManager(),
    // Add more: new YarnPackageManager(), etc.
];
function detectPackageManager(projectPath) {
    for (const pm of packageManagers) {
        if (pm.detect(projectPath)) {
            return pm;
        }
    }
    return null;
}
//# sourceMappingURL=index.js.map