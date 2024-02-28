import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-card",
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  template: `
    <div class="card__wrapper" [class.hover__card]="hover" (mouseover)="hover = true" (mouseleave)="hover = false">
      <div class="card__shadow">
        <img [src]="item.cover" [alt]="item.title" loading="lazy" />
      </div>
      <div class="card" (click)="goToAnime(item.title, item)">
        <div class="card__img">
          <img [src]="item.cover" [alt]="item.title" loading="lazy" />
          <div class="card__overlay"></div>
          <fa-icon class="play__icon" [icon]="faCirclePlay"></fa-icon>
        </div>
        <div class="card__content">
          <h3>{{ item.title }}</h3>
          <p>
            {{ animeSynopsis() }}
          </p>
        </div>
      </div>
    </div>
  `,
  styleUrl: "./card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  @Input() public index!: number;
  @Input() public item: any;
  public hover: boolean = false;
  public faCirclePlay = faCirclePlay

  constructor(
    private router: Router,
  ) {}

  ngOnInit(): void {}

  public animeSynopsis() {
    const synopsis = this.item.synopsis;
    if (synopsis.length === 0) {
      return "No hay sinopsis disponible.";
    } else if (synopsis.length < 150) {
      return synopsis;
    } else {
      const lastSpaceIndex = synopsis.lastIndexOf(" ", 150);
      const slicedSynopsis = synopsis.slice(0, lastSpaceIndex) + "...";
      return slicedSynopsis;
    }
  }

  public goToAnime(name: string, animeSelect: any) {
    if (name !== null && name !== undefined) {
      const replaceStar = name.replace(/☆/g, " ");
      const clearCharacters = replaceStar
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/^\s+|\s+$/g, "");
      const clearAnimeRoute = clearCharacters.replace(/\s+/g, "-");
      const route = "/anime/" + clearAnimeRoute;
      this.router.navigate([route]);
    }
  }
}
