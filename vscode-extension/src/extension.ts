import * as vscode from "vscode";
import { runDeployDoctor } from "./cliBridge";
import { getOutput } from "./output";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "deploy-doctor.run",
    async () => {
      const output = getOutput();
      output.show(true);

      const logUri = await vscode.window.showOpenDialog({
        canSelectMany: false,
        filters: { "Log Files": ["log", "txt"] }
      });

      if (!logUri || logUri.length === 0) {
        vscode.window.showWarningMessage("No log file selected");
        return;
      }

      try {
        await runDeployDoctor(logUri[0].fsPath);
        vscode.window.showInformationMessage(
          "Deploy Doctor finished. Check output for details."
        );
      } catch {
        vscode.window.showErrorMessage(
          "Deploy Doctor failed. See output."
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}