import { CommonModule } from "@angular/common";
import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, Input, OnInit } from "@angular/core";
import { CardComponent } from "../card/card.component";
import { Anime } from "../../../core/interfaces/anime.interface";
import { register } from 'swiper/element/bundle';

@Component({
  selector: "carousel-slider",
  standalone: true,
  imports: [CommonModule, CardComponent],
  template: `
    <swiper-container
      class="mySwiper"
      navigation="true"
      pagination="true"
      pagination-clickable="true"
      space-between="30"
      slides-per-view="5"
    >
      @for (item of data; track $index) {
        <swiper-slide>
          <app-card [item]="item" [columns]="columns"></app-card>
        </swiper-slide>
      }
    </swiper-container>
  `,
  styleUrl: "./carousel-slider.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CarouselSliderComponent implements OnInit {
  @Input() data: Anime[] = [];
  @Input() columns: number = 5;

  ngOnInit() {
    register();
  }
}
