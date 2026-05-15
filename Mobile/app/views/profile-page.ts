import { EventData, Page, Label, Frame } from "@nativescript/core";
import { ApiService } from "../services/api.service";

let page: Page;

export function navigatingTo(args: EventData) {
  page = args.object as Page;
}

export function onLogout() {
  ApiService.logout();

  Frame.topmost().navigate({
    moduleName: "views/login-page",
    clearHistory: true,
    context: { message: "Déconnexion réussie." }
  });
}