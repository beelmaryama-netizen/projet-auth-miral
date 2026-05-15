import { EventData, Page, TextField, Label, Frame } from "@nativescript/core";
import { ApiService } from "../services/api.service";

let page: Page;
let emailField: TextField;
let passwordField: TextField;
let messageLabel: Label;

export function navigatingTo(args: EventData) {
  page = args.object as Page;
  emailField = page.getViewById("emailField");
  passwordField = page.getViewById("passwordField");
  messageLabel = page.getViewById("messageLabel");

  const context = page.navigationContext;
  if (context && context.message) {
    showMessage(context.message);
  } else {
    hideMessage();
  }
}

function showMessage(message: string) {
  messageLabel.text = message;
  messageLabel.visibility = "visible";
}

function hideMessage() {
  messageLabel.text = "";
  messageLabel.visibility = "collapse";
}

export async function onLogin() {
  const email = (emailField.text || "").trim();
  const password = (passwordField.text || "").trim();

  if (!email || !password) {
    showMessage("Veuillez remplir tous les champs.");
    return;
  }

  try {
    const data = await ApiService.login(email, password);

    if (!data.token && !data.success) {
      showMessage("Email ou mot de passe incorrect.");
      return;
    }

    Frame.topmost().navigate({
      moduleName: "views/cars-page",
      clearHistory: true,
      context: { message: "Connexion réussie." }
    });
  } catch (e) {
    showMessage("Email ou mot de passe incorrect.");
  }
}

export function goRegister() {
  Frame.topmost().navigate("views/register-page");
}

export function goForgot() {
  Frame.topmost().navigate("views/forgot-page");
}