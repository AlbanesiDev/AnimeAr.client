import { ActivatedRouteSnapshot, Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () => import("./public/pages/home/home.component").then((x) => x.HomeComponent),
    title: "AnimeAr | Inicio",
  },
  {
    path: "anime/:title",
    loadComponent: () => import("./public/pages/anime/anime.component").then((x) => x.AnimeComponent),
    title: (params: ActivatedRouteSnapshot) => {
      const title = params.params["title"];
      return `AnimeAr | ${title}`;
    },
  },
  {
    path: "directorio",
    loadComponent: () => import("./public/pages/browse/browse.component").then((x) => x.BrowseComponent),
    title: "AnimeAr | Directorio",
  },
  {
    path: "register",
    loadComponent: () => import("./public/pages/register/register.component").then((x) => x.RegisterComponent),
    title: "AnimeAr | Registrarse",
  },
  {
    path: "login",
    loadComponent: () => import("./public/pages/login/login.component").then((x) => x.LoginComponent),
    title: "AnimeAr | Iniciar sesión",
  },
];
