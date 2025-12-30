"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityRule = exports.DependencyUpdateRule = exports.StartScriptRule = exports.BuildScriptRule = exports.defaultRules = void 0;
const build_script_rule_1 = require("./build-script-rule");
Object.defineProperty(exports, "BuildScriptRule", { enumerable: true, get: function () { return build_script_rule_1.BuildScriptRule; } });
const start_script_rule_1 = require("./start-script-rule");
Object.defineProperty(exports, "StartScriptRule", { enumerable: true, get: function () { return start_script_rule_1.StartScriptRule; } });
const dependency_update_rule_1 = require("./dependency-update-rule");
Object.defineProperty(exports, "DependencyUpdateRule", { enumerable: true, get: function () { return dependency_update_rule_1.DependencyUpdateRule; } });
const security_rule_1 = require("./security-rule");
Object.defineProperty(exports, "SecurityRule", { enumerable: true, get: function () { return security_rule_1.SecurityRule; } });
exports.defaultRules = [
    new build_script_rule_1.BuildScriptRule(),
    new start_script_rule_1.StartScriptRule(),
    new dependency_update_rule_1.DependencyUpdateRule(),
    new security_rule_1.SecurityRule(),
];
//# sourceMappingURL=index.js.map