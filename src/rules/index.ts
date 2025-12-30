import { Rule } from '../types';
import { BuildScriptRule } from './build-script-rule';
import { StartScriptRule } from './start-script-rule';
import { DependencyUpdateRule } from './dependency-update-rule';
import { SecurityRule } from './security-rule';

export const defaultRules: Rule[] = [
  new BuildScriptRule(),
  new StartScriptRule(),
  new DependencyUpdateRule(),
  new SecurityRule(),
];

export { BuildScriptRule, StartScriptRule, DependencyUpdateRule, SecurityRule };