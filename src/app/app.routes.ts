import { ActivatedRouteSnapshot, Routes } from "@angular/router";
import { authGuard } from "./core/guards/auth.guard";

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
    path: "mis-animes",
    canActivate: [authGuard],
    loadComponent: () => import("./public/pages/my-animes/my-animes.component").then((x) => x.MyAnimesComponent),
    title: "AnimeAr | Mis Animes",
  },
  {
    path: "perfil",
    canActivate: [authGuard],
    loadComponent: () => import("./public/pages/profile/profile.component").then((x) => x.ProfileComponent),
    title: "AnimeAr | Perfil",
  },
  {
    path: "register",
    canActivate: [() => !authGuard],
    loadComponent: () => import("./public/pages/register/register.component").then((x) => x.RegisterComponent),
    title: "AnimeAr | Registrarse",
  },
  {
    path: "login",
    canActivate: [() => !authGuard],
    loadComponent: () => import("./public/pages/login/login.component").then((x) => x.LoginComponent),
    title: "AnimeAr | Iniciar sesión",
  },
];
