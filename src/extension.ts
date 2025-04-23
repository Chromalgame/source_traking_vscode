import * as vscode from 'vscode';

let terminal: vscode.Terminal | undefined;

export function activate(context: vscode.ExtensionContext) {
    const commands = [
        { label: "Liste des fichiers à pull", command: "sf project retrieve preview" },
        { label: "Liste des fichiers à push", command: "sf project deploy preview" },
        { label: "Pull l'ensemble des fichiers", command: "sf project retrieve start" },
        { label: "Push l'ensemble des fichiers", command: "sf project deploy start" },
        { label: "Activer le source traking", command: "sf org enable tracking" },
        { label: "Reset le traking", command: "sf project reset tracking" }
    ];

    const disposable = vscode.commands.registerCommand('extension.runCustomCommand', async () => {
        const selected = await vscode.window.showQuickPick(
            commands.map(cmd => cmd.label),
            { placeHolder: "Choisissez une commande à exécuter" }
        );

        if (selected) {
            const cmd = commands.find(c => c.label === selected)?.command;
            if (cmd) {
                if (!terminal) {
                    terminal = vscode.window.createTerminal("Commande Personnalisée");
                }
                terminal.show();
                terminal.sendText(cmd);
            }
        }
    });

    context.subscriptions.push(disposable);
}
