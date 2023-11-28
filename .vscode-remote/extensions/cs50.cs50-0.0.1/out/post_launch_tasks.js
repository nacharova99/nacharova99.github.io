"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post_launch_tasks = void 0;
const vscode = require("vscode");
function post_launch_tasks() {
    activateGitDoc();
}
exports.post_launch_tasks = post_launch_tasks;
/**
 * Forcefully activate GitDoc.
 */
function activateGitDoc() {
    setTimeout(() => {
        try {
            vscode.commands.executeCommand('gitdoc.enable');
        }
        catch (e) {
            console.log(e);
        }
    }, 120000);
}
//# sourceMappingURL=post_launch_tasks.js.map