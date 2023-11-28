"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.launchDebugger = void 0;
const vscode = require("vscode");
// Initialization
vscode.debug.breakpoints;
function launchDebugger(workspace_folder, config, ws) {
    // Get all breakpoints
    const breakpoints = vscode.debug.breakpoints;
    // If Java debugging, skip checking breakpoints
    if (config.java_debugging) {
        const debugConfiguration = config.launch_config;
        vscode.debug.startDebugging(workspace_folder, debugConfiguration);
        setTimeout(() => {
            vscode.commands.executeCommand('workbench.action.terminal.focus');
        }, 10000);
        return;
    }
    let source_files;
    config.source_files == null ? source_files = [] : source_files = config.source_files;
    // Iterate each breakpoints' URI and see if it matches any URI found in the source files (c/cpp) or current python file
    for (const index in breakpoints) {
        const breakpoint = JSON.parse(JSON.stringify(breakpoints[index]));
        if (config.path == breakpoint.location.uri.path || source_files.includes(breakpoint.location.uri.path)) {
            const debugConfiguration = config.launch_config;
            vscode.debug.startDebugging(workspace_folder, debugConfiguration);
            setTimeout(() => {
                vscode.commands.executeCommand('workbench.action.terminal.focus');
            }, 10000);
            return;
        }
    }
    ws.send('no_break_points');
}
exports.launchDebugger = launchDebugger;
//# sourceMappingURL=debug.js.map