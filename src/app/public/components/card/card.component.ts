import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-card",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="card__wrapper" [class.hover__card]="hover" (mouseover)="hover = true" (mouseleave)="hover = false">
      <div class="card__shadow">
        <img [src]="item.cover" loading="lazy" [alt]="item.title" />
      </div>
      <div class="card" [routerLink]="goToAnime(item.title)">
        <div class="card__img">
          <img [src]="item.cover" loading="lazy" [alt]="item.title" />
          <div class="card__overlay"></div>
          <img class="play__icon" src="/assets/icons/overlay.png" alt="" />
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

  constructor() {}

  ngOnInit(): void {}

  public animeSynopsis() {
    const synopsis = this.item.synopsis;
    if (synopsis.length === 0) {
      return "No hay sinopsis disponible.";
    } else if (synopsis.length < 200) {
      return synopsis;
    } else {
      const lastSpaceIndex = synopsis.lastIndexOf(" ", 200);
      const slicedSynopsis = synopsis.slice(0, lastSpaceIndex) + "...";
      return slicedSynopsis;
    }
  }

  public goToAnime(name: string) {
    if (name !== null && name !== undefined) {
      const replaceStar = name.replace(/☆/g, " ");
      const clearCharacters = replaceStar
        .toLowerCase()
        .replace(/[^a-zA-Z0-9 ]/g, "")
        .replace(/^\s+|\s+$/g, "");
      const clearAnimeRoute = clearCharacters.replace(/\s+/g, "-");
      const route = "/anime/" + clearAnimeRoute;

      return route;
    }
    throw new Error("Name not found");
  }
}
