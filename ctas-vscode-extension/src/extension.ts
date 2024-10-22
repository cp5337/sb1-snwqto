import * as vscode from 'vscode';
import axios from 'axios';

let ctasWebAppUrl: string | undefined;

export function activate(context: vscode.ExtensionContext) {
  console.log('CTAS extension is now active!');

  let connectToWebApp = vscode.commands.registerCommand('ctas.connectToWebApp', async () => {
    ctasWebAppUrl = await vscode.window.showInputBox({
      prompt: 'Enter the URL of your CTAS web application',
      placeHolder: 'https://your-ctas-app.com'
    });

    if (ctasWebAppUrl) {
      vscode.window.showInformationMessage(`Connected to CTAS web app at ${ctasWebAppUrl}`);
    }
  });

  let viewThreatActors = vscode.commands.registerCommand('ctas.viewThreatActors', async () => {
    if (!ctasWebAppUrl) {
      vscode.window.showErrorMessage('Please connect to the CTAS web app first.');
      return;
    }

    try {
      const response = await axios.get(`${ctasWebAppUrl}/api/threat-actors`);
      const threatActors = response.data;

      const panel = vscode.window.createWebviewPanel(
        'ctasThreatActors',
        'CTAS Threat Actors',
        vscode.ViewColumn.One,
        {}
      );

      panel.webview.html = getThreatActorsHtml(threatActors);
    } catch (error) {
      vscode.window.showErrorMessage('Failed to fetch threat actors from CTAS web app.');
    }
  });

  let viewCTASTasks = vscode.commands.registerCommand('ctas.viewCTASTasks', async () => {
    if (!ctasWebAppUrl) {
      vscode.window.showErrorMessage('Please connect to the CTAS web app first.');
      return;
    }

    try {
      const response = await axios.get(`${ctasWebAppUrl}/api/ctas-tasks`);
      const ctasTasks = response.data;

      const panel = vscode.window.createWebviewPanel(
        'ctasTasks',
        'CTAS Tasks',
        vscode.ViewColumn.One,
        {}
      );

      panel.webview.html = getCTASTasksHtml(ctasTasks);
    } catch (error) {
      vscode.window.showErrorMessage('Failed to fetch CTAS tasks from CTAS web app.');
    }
  });

  context.subscriptions.push(connectToWebApp, viewThreatActors, viewCTASTasks);
}

function getThreatActorsHtml(threatActors: any[]): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>CTAS Threat Actors</title>
    </head>
    <body>
      <h1>CTAS Threat Actors</h1>
      <ul>
        ${threatActors.map(actor => `<li>${actor.name} - ${actor.type}</li>`).join('')}
      </ul>
    </body>
    </html>
  `;
}

function getCTASTasksHtml(ctasTasks: any[]): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>CTAS Tasks</title>
    </head>
    <body>
      <h1>CTAS Tasks</h1>
      <ul>
        ${ctasTasks.map(task => `<li>${task.title} - ${task.status}</li>`).join('')}
      </ul>
    </body>
    </html>
  `;
}

export function deactivate() {}