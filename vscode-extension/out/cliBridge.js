"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runDeployDoctor = runDeployDoctor;
const child_process_1 = require("child_process");
const output_1 = require("./output");
function runDeployDoctor(logFile) {
    const output = (0, output_1.getOutput)();
    output.appendLine(`Running deploy-doctor on ${logFile}...\n`);
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)(`deploy-doctor doctor "${logFile}"`, (err, stdout, stderr) => {
            if (err) {
                output.appendLine(stderr);
                reject(stderr);
                return;
            }
            output.appendLine(stdout);
            resolve(stdout);
        });
    });
}
//# sourceMappingURL=cliBridge.js.map