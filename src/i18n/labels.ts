import type { RouteKey } from "./routes";
import type { UiKey } from "./ui/it";

/** UI string that names each page: menu label, footer label and page title. */
export const routeLabels = {
  home: "nav.home",
  about: "nav.about",
  services: "nav.services",
  projects: "nav.projects",
  quote: "nav.quote",
  contact: "nav.contact",
  privacy: "footer.privacy",
  cookies: "footer.cookies",
} as const satisfies Record<RouteKey, UiKey>;
