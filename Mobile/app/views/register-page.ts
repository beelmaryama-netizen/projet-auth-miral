import { EventData, Page, TextField, Label, Frame } from "@nativescript/core";
import { ApiService } from "../services/api.service";

let page: Page;
let nameField: TextField;
let emailField: TextField;
let passwordField: TextField;
let messageLabel: Label;

export function navigatingTo(args: EventData) {
  page = args.object as Page;
  nameField = page.getViewById("nameField");
  emailField = page.getViewById("emailField");
  passwordField = page.getViewById("passwordField");
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

export async function onRegister() {
  const full_name = (nameField.text || "").trim();
  const email = (emailField.text || "").trim();
  const password = (passwordField.text || "").trim();

  if (!full_name || !email || !password) {
    showMessage("Veuillez remplir tous les champs.");
    return;
  }

  if (password.length < 8) {
    showMessage("Le mot de passe doit contenir au moins 8 caractères.");
    return;
  }

  try {
    const data = await ApiService.register(full_name, email, password);

    if (data.error || data.message === "EMAIL_EXISTS") {
      showMessage("Cet email existe déjà. Utilisez un autre email.");
      return;
    }

    Frame.topmost().navigate({
      moduleName: "views/login-page",
      clearHistory: true,
      context: { message: "Inscription réussie. Connectez-vous maintenant." }
    });
  } catch (e) {
    showMessage("Cet email existe déjà ou le serveur est indisponible.");
  }
}

export function goLogin() {
  Frame.topmost().navigate("views/login-page");
}