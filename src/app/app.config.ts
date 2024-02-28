import { ApplicationConfig, importProvidersFrom } from "@angular/core";
import { provideClientHydration } from "@angular/platform-browser";
import { provideAnimations } from "@angular/platform-browser/animations";
import { provideRouter } from "@angular/router";

import { routes } from "./app.routes";
import { provideHttpClient, withFetch, withInterceptors } from "@angular/common/http";
import { errorHandlerInterceptor } from "./core/interceptors/error-handler.interceptor";
import { firebaseProviders } from "./firebase.config";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    firebaseProviders,
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(withFetch(), withInterceptors([errorHandlerInterceptor])),
  ],
};
