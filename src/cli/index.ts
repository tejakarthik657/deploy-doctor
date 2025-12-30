#!/usr/bin/env node

import { Command } from 'commander';
import * as path from 'path';
import { DeployDoctorEngine } from '../core/engine';
import { defaultRules } from '../rules';

const program = new Command();

program
  .name('deploy-doctor')
  .description('Diagnose deployment readiness issues in your project')
  .version('1.0.0')
  .argument('<path>', 'Path to the project directory')
  .action(async (projectPath: string) => {
    const absolutePath = path.resolve(projectPath);
    const engine = new DeployDoctorEngine(defaultRules);
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