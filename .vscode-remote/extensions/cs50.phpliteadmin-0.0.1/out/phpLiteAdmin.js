"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhpLiteAdminProvider = void 0;
const vscode = require("vscode");
const child_process_1 = require("child_process");
const dispose_1 = require("./dispose");
const DEFAULT_PORT = 8082;
class SQLiteDocument extends dispose_1.Disposable {
    static async create(uri, backupId) {
        return new SQLiteDocument(uri);
    }
    constructor(uri) {
        super();
        this._onDidDispose = this._register(new vscode.EventEmitter());
        /**
         * Fired when the document is disposed of.
         */
        this.onDidDispose = this._onDidDispose.event;
        this._uri = uri;
    }
    get uri() { return this._uri; }
}
class PhpLiteAdminProvider {
    static register(context) {
        return vscode.window.registerCustomEditorProvider(PhpLiteAdminProvider.viewType, new PhpLiteAdminProvider(context), {
            // For this demo extension, we enable `retainContextWhenHidden` which keeps the
            // webview alive even when it is not visible. You should avoid using this setting
            // unless is absolutely required as it does have memory overhead.
            webviewOptions: {
                retainContextWhenHidden: true,
            },
            supportsMultipleEditorsPerDocument: false,
        });
    }
    constructor(_context) {
        this._context = _context;
        /**
         * Tracks all known webviews
         */
        this.webviews = new WebviewCollection();
        this._requestId = 1;
        this._callbacks = new Map();
        this._onDidChangeCustomDocument = new vscode.EventEmitter();
        this.onDidChangeCustomDocument = this._onDidChangeCustomDocument.event;
    }
    async openCustomDocument(uri, openContext, _token) {
        const document = await SQLiteDocument.create(uri, openContext.backupId);
        return document;
    }
    async resolveCustomEditor(document, webviewPanel, _token) {
        // Launch php server
        (0, child_process_1.exec)(`/opt/cs50/bin/phpliteadmin ${document.uri.path}`, { "env": process.env });
        // Add the webview to our internal set of active webviews
        this.webviews.add(document.uri, webviewPanel);
        // Setup initial content for the webview
        webviewPanel.webview.options = {
            enableScripts: true,
        };
        // Construct preview url
        const local_url = `http://127.0.0.1:8082`;
        const preview_url = `https://${process.env.CODESPACE_NAME}-8082.${process.env['GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN'] || 'app.github.dev'}/`;
        // Load webview
        webviewPanel.webview.html = this.getHtmlForWebview(webviewPanel.webview, local_url, preview_url);
        setTimeout(() => {
            vscode.env.openExternal(vscode.Uri.parse(local_url));
        }, 1000);
    }
    getHtmlForWebview(webview, local_url, preview_url) {
        return /* html */ `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>phpLiteAdmin</title>
        </head>
        <body style="background-color: #ffffff;">
        <div id=phpliteadmin></div>
        <h3 style="color: #000000;">Please visit the following link to view the database:</h3>
        <h3 style="color: #000000;"><a href="${local_url}">${preview_url}</a></h3>
        </body>
        </html>`;
    }
    postMessageWithResponse(panel, type, body) {
        const requestId = this._requestId++;
        const p = new Promise(resolve => this._callbacks.set(requestId, resolve));
        panel.webview.postMessage({ type, requestId, body });
        return p;
    }
    saveCustomDocument(document, cancellation) {
        return;
    }
    saveCustomDocumentAs(document, destination, cancellation) {
        return;
    }
    revertCustomDocument(document, cancellation) {
        return;
    }
    backupCustomDocument(document, context, cancellation) {
        return;
    }
}
exports.PhpLiteAdminProvider = PhpLiteAdminProvider;
PhpLiteAdminProvider.viewType = 'cs50.phpliteadmin';
/**
 * Tracks all webviews.
 */
class WebviewCollection {
    constructor() {
        this._webviews = new Set();
    }
    /**
     * Get all known webviews for a given uri.
     */
    *get(uri) {
        const key = uri.toString();
        for (const entry of this._webviews) {
            if (entry.resource === key) {
                yield entry.webviewPanel;
            }
        }
    }
    /**
     * Add a new webview to the collection.
     */
    add(uri, webviewPanel) {
        const entry = { resource: uri.toString(), webviewPanel };
        this._webviews.add(entry);
        webviewPanel.onDidDispose(() => {
            // Kill process running on port 8082 and start WebSocket server
            (0, child_process_1.exec)(`PATH=$PATH:/home/ubuntu/.local/bin && fuser -k ${DEFAULT_PORT}/tcp`, { "env": process.env });
        });
    }
}
//# sourceMappingURL=phpLiteAdmin.js.map