import * as vscode from 'vscode'
import { TextEdit } from 'vscode';

const {
  commands: { registerCommand, executeCommand },
  window,
  ViewColumn,
  workspace,
  Uri
} = vscode


const openHTML = async () => {
  try {
    const uri = Uri.parse('file:///index.html')
    const success = await executeCommand('vscode.previewHtml', uri)
    if (success !== undefined) console.log('HTML opened successfully.')
  } catch(err) {
    console.error(err)
  } finally {
    console.log('Attempted to opne HTML...')
  }
}

const openFile = async () => {
  try {
    const schemaUri = Uri.parse('file:///testGraphQL.graphql')
    const success = await executeCommand('vscode.open', schemaUri)
    if (success !== undefined) console.log('File opened successfully.')
  } catch(err) {
    console.error(err)
  } finally {
    console.log('Attempted to open file...')
  }
}

const getViewColumn = (sideBySide: boolean) => {
  const { activeTextEditor } = window
  if (!activeTextEditor) return ViewColumn.One
  if (!sideBySide) return activeTextEditor.viewColumn
  if (activeTextEditor.viewColumn === ViewColumn.One) return ViewColumn.Two
  if (activeTextEditor.viewColumn === ViewColumn.Two) return ViewColumn.Three
  return activeTextEditor.viewColumn
}


export const activate = ({ subscriptions }) => {
  console.log('Extension "graphiql-vscode" has activated...')

  const initialize = registerCommand('extension.initialize', () => {
    window.showInformationMessage('Initialized GraphiQL Explorer...')
  })
    
  const openTabOnRight = registerCommand('extension.openTabOnRight', () => {
    window.showInformationMessage('Opening GraphiQL Explorer In Side Panel.')
    
    // openHTML()
    openFile()
  })

  subscriptions.push(initialize, openTabOnRight)
}

export const deactivate = () => {}  


// getViewColumn(true)
// window.activeTextEditor = window.showTextDocument()

// window.createOutputChannel('GraphiQL').show()
// workspace.openTextDocument({
//   language: 'graphql',
//   content: 'type User {\n\tname: String!\n}',
// })
//   .then(() => console.log('New Doc Opened.'))

