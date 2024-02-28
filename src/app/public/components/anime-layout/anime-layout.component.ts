import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { CardComponent } from "../card/card.component";
import { CarouselSliderComponent } from "../carousel-slider/carousel-slider.component";
import { PlaceholderLoaderComponent } from "../placeholder-loader/placeholder-loader.component";

@Component({
  selector: "anime-layout",
  standalone: true,
  imports: [CommonModule, CardComponent, CarouselSliderComponent, PlaceholderLoaderComponent],
  template: `
    <div class="container">
      @if (card) {
        <div class="anime-layout">
          <h3>{{ titleLayout }}</h3>
          <div
            class="anime-layout__container"
            [ngStyle]="{
              'grid-template-columns': 'repeat(' + columns + ', 2fr)',
              'grid-template-rows': 'repeat(' + rows + ', 2fr)'
            }"
          >
            @for (item of data; track $index) {
              @if ($index < rows * columns) {
                @defer (on viewport) {
                  <app-card [item]="item" [index]="$index"></app-card>
                } @placeholder () {
                  <div class="card__placeholder">
                    <app-placeholder></app-placeholder>
                  </div>
                }
              }
            }
          </div>
        </div>
      } @else {
        <div class="">
          <h3>{{ titleLayout }}</h3>
          <div class="">
            <carousel-slider [data]="data"></carousel-slider>
          </div>
        </div>
      }
    </div>
  `,
  styleUrl: "./anime-layout.component.scss",
})
export class AnimeLayoutComponent {
  @Input() data!: any;
  @Input() card!: boolean;
  @Input() titleLayout!: string;
  @Input() columns: number = 1;


  @Input() rows: number = 1;
}
