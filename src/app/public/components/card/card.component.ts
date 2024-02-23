import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-card",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="card" [class.hover__card]="hover">
      <div class="img__container " (mouseover)="onHover(true)" (mouseleave)="onLeave(false)" [routerLink]="goToAnime(item.title)">
        <img class="img__shadow" [src]="item.cover" loading="lazy" [alt]="item.title"/>
        <img [src]="item.cover" loading="lazy" [alt]="item.title"/>
        <div class="img__overlay"></div>
        <div class="text__container">
          <h3>{{ item.title }}</h3>
        </div>
      </div>
    </div>
  `,
  styleUrl: "./card.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {
  @Input() public index!: number;
  @Input() public item: any;
  public hover: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  public onHover(state: boolean): void {
    this.hover = state;
  }

  public onLeave(state: boolean): void {
    this.hover = state;
  }

  public goToAnime(name: string) {
    if (name !== null && name !== undefined) {
      const replaceStar = name.replace(/☆/g, " ");
      const clearCharacters = replaceStar.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "").replace(/^\s+|\s+$/g, "");
      const clearAnimeRoute = clearCharacters.replace(/\s+/g, "-");
      const route = '/anime/' + clearAnimeRoute;

      return route;
    }
    throw new Error('Name not found');
  }
}
