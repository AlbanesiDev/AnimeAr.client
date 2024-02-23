import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SearchbarComponent } from "../searchbar/searchbar.component";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterModule, SearchbarComponent],
  template: `<header>
    <div class="container">
      <div class="logo-container"></div>
      <nav>
        <ul>
          <li>
            <a routerLink="/" routerLinkActive="active">inicio</a>
          </li>
          <li>
            <a routerLink="/directorio" routerLinkActive="active">directorio</a>
          </li>
        </ul>
      </nav>
      <div class="searchbar-container">
        <app-searchbar></app-searchbar>
      </div>
      <div class="login-container">
        <button class="btn-primary" routerLink="/login">Log in</button>
        <button class="btn-secondary" routerLink="/register">Get Started</button>
      </div>
    </div>
  </header> `,
  styleUrl: "./header.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
