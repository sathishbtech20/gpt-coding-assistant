import * as vscode from "vscode";
import { askGPT } from "./gptClient";

export function activate(context: vscode.ExtensionContext) {
  // Command: Explain Code
  let explainCode = vscode.commands.registerCommand("gpt.explainCode", async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;
    const code = editor.document.getText(editor.selection);

    vscode.window.showInformationMessage("Asking GPT-5 for explanation...");
    const result = await askGPT(`Explain this code clearly:\n${code}`);
    vscode.workspace.openTextDocument({ content: result, language: "markdown" })
      .then(doc => vscode.window.showTextDocument(doc, { preview: false }));
  });

  // Command: Generate Unit Test
  let generateTest = vscode.commands.registerCommand("gpt.generateTest", async () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;
    const code = editor.document.getText(editor.selection);

    vscode.window.showInformationMessage("Asking GPT-5 to generate tests...");
    const result = await askGPT(`Write unit tests for this code:\n${code}`);
    vscode.workspace.openTextDocument({ content: result, language: "typescript" })
      .then(doc => vscode.window.showTextDocument(doc, { preview: false }));
  });

  context.subscriptions.push(explainCode, generateTest);
}

export function deactivate() {}

