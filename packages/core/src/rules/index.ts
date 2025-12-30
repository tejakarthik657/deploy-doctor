import { nodeVersionRule } from "./nodeVersion.rule";
import { missingEnvRule } from "./missingEnv.rule";
import { pnpmMissingRule } from "./pnpmMissing.rule";
import { bunMisuseRule } from "./bunMisuse.rule";
import { pathCaseRule } from "./pathCase.rule";
import { buildCommandMismatchRule } from "./buildCommandMismatch.rule";
import { nativePostinstallRule } from "./nativePostinstall.rule";

export const rules = [
  nodeVersionRule,
  missingEnvRule,
  pnpmMissingRule,
  bunMisuseRule,
  buildCommandMismatchRule,
  nativePostinstallRule,
  pathCaseRule
];