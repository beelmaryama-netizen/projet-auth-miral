import { NavigatedData, Page } from "@nativescript/core";

export function onNavigatingTo(args: NavigatedData) {
  const page = args.object as Page;
}

export function goLogin(args) {
  const page = args.object.page;
  page.frame.navigate("views/login-page");
}

export function goCars(args) {
  const page = args.object.page;
  page.frame.navigate("views/cars-page");
}