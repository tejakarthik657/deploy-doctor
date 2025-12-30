#!/usr/bin/env node
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
const commander_1 = require("commander");
const path = __importStar(require("path"));
const engine_1 = require("../core/engine");
const rules_1 = require("../rules");
const program = new commander_1.Command();
program
    .name('deploy-doctor')
    .description('Diagnose deployment readiness issues in your project')
    .version('1.0.0')
    .argument('<path>', 'Path to the project directory')
    .action(async (projectPath) => {
    const absolutePath = path.resolve(projectPath);
    const engine = new engine_1.DeployDoctorEngine(rules_1.defaultRules);
    const issues = await engine.run(absolutePath);
    if (issues.length === 0) {
        console.log('✅ No issues found. Your project looks ready for deployment!');
        return;
    }
    console.log(`Found ${issues.length} issue(s):\n`);
    for (const issue of issues) {
        const icon = issue.severity === 'error' ? '❌' : issue.severity === 'warning' ? '⚠️' : 'ℹ️';
        console.log(`${icon} [${issue.rule}] ${issue.message}`);
        if (issue.file) {
            console.log(`   File: ${issue.file}${issue.line ? `:${issue.line}` : ''}`);
        }
    }
    const errorCount = issues.filter(i => i.severity === 'error').length;
    if (errorCount > 0) {
        process.exit(1);
    }
});
program.parse();
//# sourceMappingURL=index.js.map