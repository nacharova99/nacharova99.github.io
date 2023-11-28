"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openPreviewLinkAsLocalhostUrl = void 0;
const vscode = require("vscode");
const LOCAL_HOST = 'http://127.0.0.1';
function openPreviewLinkAsLocalhostUrl() {
    // https://code.visualstudio.com/updates/v1_49#_terminal-link-providers
    vscode.window.registerTerminalLinkProvider({
        provideTerminalLinks: (context, token) => {
            try {
                // Detect the GitHub preview link if it exists and linkify it
                const protocol = 'https://';
                const codespaceName = process.env.CODESPACE_NAME;
                const githubPreviewDomain = process.env['GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN'] || 'app.github.dev';
                const startIndex = context.line.indexOf(codespaceName) - protocol.length;
                const endIndex = context.line.indexOf(githubPreviewDomain) + githubPreviewDomain.length;
                // Extract port number
                const port = context.line.substring(startIndex + protocol.length + codespaceName.length + 1, endIndex - githubPreviewDomain.length - 1);
                if (startIndex > -1) {
                    return [
                        {
                            startIndex: startIndex,
                            length: endIndex - startIndex,
                            tooltip: 'Open URL',
                            data: `${LOCAL_HOST}:${port}`
                        }
                    ];
                }
                return [];
            }
            catch (error) {
                return [];
            }
        },
        handleTerminalLink: async (link) => {
            const uri = await vscode.env.asExternalUri(vscode.Uri.parse(link.data));
            vscode.env.openExternal(uri);
        }
    });
}
exports.openPreviewLinkAsLocalhostUrl = openPreviewLinkAsLocalhostUrl;
//# sourceMappingURL=link_provider.js.map