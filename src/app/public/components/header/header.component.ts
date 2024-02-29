import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SearchbarComponent } from "../searchbar/searchbar.component";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterModule, SearchbarComponent, FontAwesomeModule],
  template: `<header>
    <div class="container">
      <div class="logo-container">
        <img src="" alt="">
      </div>
      <button class="btn__nav" (click)="menu = !menu" [ngStyle]="{ background: menu ? '#ECAE61' : 'transparent' }">
        <fa-icon [icon]="faBars"></fa-icon>
      </button>
      <div class="menu" [class.menu-open]="menu">
        <nav>
          <ul>
            <li>
              <a routerLink="/" routerLinkActive="active">inicio</a>
            </li>
            <li>
              <a routerLink="/directorio" routerLinkActive="active">directorio</a>
            </li>
          @if (authService.currentUserSig()) {
            <li>
              <a routerLink="/mis-animes" routerLinkActive="active">Mis Animes</a>
            </li>
            <li>
              <a routerLink="/perfil" routerLinkActive="active">perfil</a>
            </li>
            <li>
              <a (click)="authService.signOut()">cerrar sesion</a>
            </li>
          } @else {
            <button class="btn-primary" routerLink="/login">Iniciar sesion</button>
            <button class="btn-secondary" routerLink="/register">Registrarse</button>
          }
          @if ('admin') {

          }
          </ul>
        </nav>
        <div class="searchbar-container">
          <!-- <app-searchbar></app-searchbar> -->
        </div>
      </div>
    </div>
  </header> `,
  styleUrl: "./header.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  authService = inject(AuthService);
  faBars = faBars;
  menu = false;
}
