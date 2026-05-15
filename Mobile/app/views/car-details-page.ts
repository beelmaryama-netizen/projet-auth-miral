import { EventData, Page, Label, Frame } from "@nativescript/core";
import { ApiService } from "../services/api.service";

let page: Page;

export function navigatingTo(args: EventData) {
  page = args.object as Page;

  const car = page.navigationContext.car;

  const nameLabel = page.getViewById("nameLabel") as Label;
  const brandLabel = page.getViewById("brandLabel") as Label;
  const priceLabel = page.getViewById("priceLabel") as Label;
  const descriptionLabel = page.getViewById("descriptionLabel") as Label;

  nameLabel.text = car.name || "Voiture";
  brandLabel.text = car.brand || "Marque";
  priceLabel.text = car.price_per_day || "Prix non disponible";
  descriptionLabel.text = car.description || "Aucune description disponible.";
}

export function goBackList() {
  Frame.topmost().navigate("views/cars-page");
}

export function onLogout() {
  ApiService.logout();

  Frame.topmost().navigate({
    moduleName: "views/login-page",
    clearHistory: true,
    context: { message: "Déconnexion réussie." }
  });
}