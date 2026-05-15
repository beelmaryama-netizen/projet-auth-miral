import { EventData, Page, TextField, Label, Frame } from "@nativescript/core";

let page: Page;
let emailField: TextField;
let messageLabel: Label;

export function navigatingTo(args: EventData) {
  page = args.object as Page;
  emailField = page.getViewById("emailField");
  messageLabel = page.getViewById("messageLabel");
  hideMessage();
}

function showMessage(message: string) {
  messageLabel.text = message;
  messageLabel.visibility = "visible";
}

function hideMessage() {
  messageLabel.text = "";
  messageLabel.visibility = "collapse";
}

export function onSend() {
  const email = (emailField.text || "").trim();

  if (!email) {
    showMessage("Veuillez entrer votre adresse email.");
    return;
  }

  if (!email.includes("@")) {
    showMessage("Veuillez entrer un email valide.");
    return;
  }

  showMessage("Instructions envoyées. Vérifiez votre boîte email.");
}

export function goLogin() {
  Frame.topmost().navigate({
    moduleName: "views/login-page",
    context: { message: "Retour à la connexion." }
  });
}