# 📦 1. Installer les outils nécessaires
Avant de packager ton extension, assure-toi d’avoir Node.js et npm installés. Ensuite, installe ``vsce`` (l'outil officiel pour packager les extensions) :

```sh
npm install -g @vscode/vsce
```
# 🔧 2. Configurer le projet
Dans le dossier de ton extension, assure-toi d’avoir un fichier ``package.json``. Si ce n’est pas encore fait, génère-le avec :
```sh
npm init -y
```
Ajoute ensuite ces champs dans ``package.json`` pour définir ton extension :

```json
{
  "name": "source-traking-vscode",
  "displayName": "Source Tracking",
  "description": "Petite desciption simple",
  "version": "1.0.0",
  "main": "./out/extension.js",
  "engines": {
    "vscode": "^1.98.0"
  },
  "categories": [
    "Other"
  ],
  "contributes": {
    "commands": [
      {
        "command": "extension.runCustomCommand",
        "title": "KPC: Source Traking"
      }
    ]
  },
  "activationEvents": [
    "onCommand:extension.runCustomCommand"
  ],
  "scripts": {
    "vscode:prepublish": "npm run compile",
    "compile": "tsc -p ./"
  },
  "devDependencies": {
    "@types/node": "^22.13.10",
    "@types/vscode": "^1.98.0"
  }
}

```
# 🏗 3. Compiler ton extension
Si tu n’as pas encore installé TypeScript, fais-le avec :

```sh
npm install -g typescript
```
Ensuite, compile ton extension avec :

```sh
npm run compile
```
Cela va générer un dossier ``out/`` contenant ``extension.js``.

# 📦 4. Packager l’extension
Crée le fichier ``.vsix`` qui servira à l’installation :

```sh
vsce package
```
Cela va générer un fichier ``.vsix`` (ex: ``source-traking-vscode-1.0.0.vsix``).

# 🛠 5. Installer l’extension dans VSCode
Dans VSCode, ouvre le terminal et exécute :

```sh
code --install-extension source-traking-vscode-1.0.0.vsix
```
Ou, tu peux aussi aller dans Extensions (``Ctrl+Shift+X``) → … (menu en haut) → Installer depuis un fichier VSIX… et sélectionner le fichier ``.vsix``.

# 🚀 6. Tester ton extension
- Ouvre la Command Palette (``Ctrl+Shift+P``).
- Tape "Exécuter une commande personnalisée" et choisis une option.
- Vérifie que la commande s’exécute bien dans le terminal intégré.