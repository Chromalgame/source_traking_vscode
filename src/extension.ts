import * as vscode from "vscode";

let terminal: vscode.Terminal | undefined;

export function activate(context: vscode.ExtensionContext) {
  const commands = [
    {
      label: `Liste des fichiers à pull`,
      command: `sf project retrieve preview`,
    },
    {
      label: `Liste des fichiers à push`,
      command: `sf project deploy preview`,
    },
    {
      label: `Pull l'ensemble des fichiers`,
      command: `sf project retrieve start`,
    },
    {
      label: `Push l'ensemble des fichiers`,
      command: `sf project deploy start`,
    },
    { label: `Activer le source traking`, command: `sf org enable tracking` },
    { label: `Reset le traking`, command: `sf project reset tracking` },
    {
      label: `Get log`,
      command: `sfdx force:apex:log:tail --color`,
      newTerminal: true,
    },
    {
      label: `Get user debug log`,
      command: `sfdx force:apex:log:tail --color | Select-String "USER_DEBUG"`,
      newTerminal: true,
    },
  ];

  const disposable = vscode.commands.registerCommand(
    "extension.runCustomCommand",
    async () => {
      const selected = await vscode.window.showQuickPick(
        commands.map((cmd) => cmd.label),
        { placeHolder: "Choisissez une commande à exécuter" }
      );

      if (selected) {
        const cmdObj = commands.find((c) => c.label === selected);
        if (cmdObj && cmdObj.command) {
          if (cmdObj.newTerminal) {
            const newTerm = vscode.window.createTerminal(
              `Commande: ${cmdObj.label}`
            );
            newTerm.show();
            newTerm.sendText(cmdObj.command);
          } else {
            if (!terminal) {
              terminal = vscode.window.createTerminal("Commande Personnalisée");
            }
            terminal.show();
            terminal.sendText(cmdObj.command);
          }
        }
      }
    }
  );

  context.subscriptions.push(disposable);
}
