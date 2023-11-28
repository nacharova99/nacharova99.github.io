"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const child_process_1 = require("child_process");
const vscode = require("vscode");
const phpLiteAdmin_1 = require("./phpLiteAdmin");
async function activate(context) {
    context.subscriptions.push(phpLiteAdmin_1.PhpLiteAdminProvider.register(context));
    context.subscriptions.push(vscode.commands.registerCommand('phpliteadmin50.open', open));
    await vscode.commands.executeCommand("setContext", "phpliteadmin50:didActivateExtension", true);
}
exports.activate = activate;
function open(fileUri) {
    // Launch php server
    (0, child_process_1.exec)(`/opt/cs50/bin/phpliteadmin ${fileUri.path}`, { "env": process.env }, () => {
        const local_url = `http://127.0.0.1:8082`;
        vscode.env.openExternal(vscode.Uri.parse(local_url));
    });
}
//# sourceMappingURL=extension.js.map