import * as vscode from "vscode";

let channel: vscode.OutputChannel;

export function getOutput() {
  if (!channel) {
    channel = vscode.window.createOutputChannel("Deploy Doctor");
  }
  return channel;
}