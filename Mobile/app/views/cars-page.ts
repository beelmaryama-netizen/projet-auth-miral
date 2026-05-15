import { EventData, Page, Label, ListView, Frame } from "@nativescript/core";
import { ApiService } from "../services/api.service";

let page: Page;
let carsList: ListView;
let messageLabel: Label;

let cars: any[] = [
  { id: 1, name: "Mercedes Classe S", brand: "Mercedes-Benz", price_per_day: "350 $ / jour", description: "Voiture de luxe confortable avec intérieur premium." },
  { id: 2, name: "BMW Série 7", brand: "BMW", price_per_day: "320 $ / jour", description: "Berline élégante, rapide et moderne." },
  { id: 3, name: "Audi A8", brand: "Audi", price_per_day: "300 $ / jour", description: "Voiture haut de gamme avec excellente technologie." }
];

export async function navigatingTo(args: EventData) {
  page = args.object as Page;
  carsList = page.getViewById("carsList");
  messageLabel = page.getViewById("messageLabel");

  const context = page.navigationContext;
  if (context && context.message) {
    showMessage(context.message);
  } else {
    hideMessage();
  }

  try {
    const data = await ApiService.getCars();
    if (Array.isArray(data) && data.length > 0) {
      cars = data;
    }
  } catch (e) {}

  carsList.items = cars;
}

function showMessage(message: string) {
  messageLabel.text = message;
  messageLabel.visibility = "visible";
}

function hideMessage() {
  messageLabel.text = "";
  messageLabel.visibility = "collapse";
}

export function onCarTap(args: any) {
  const car = cars[args.index];

  Frame.topmost().navigate({
    moduleName: "views/car-details-page",
    context: { car }
  });
}

export function onLogout() {
  ApiService.logout();

  Frame.topmost().navigate({
    moduleName: "views/login-page",
    clearHistory: true,
    context: { message: "Déconnexion réussie." }
  });
}