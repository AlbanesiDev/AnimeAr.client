import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { AuthService } from "../../../core/services/auth.service";
import { Router } from "@angular/router";
import { FormDataInterface, FormUiInterface } from "../../models/form.interface";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

@Component({
  selector: "app-auth-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
  template: `
      <div class="form__wrapper">
        <h1>{{ formUi[0].title }}</h1>
        @if (errorMessage) {
          <div class="error-message">{{ errorMessage }}</div>
        }
        <form class="form" [formGroup]="form" (submit)="submitEvent">
          <div class="container">
            <div class="form__group">
              @for (item of formData; track $index) {
                <input [type]="formData[0].type" [placeholder]="formData[0].placeholder" [formControlName]="formData[0].control" />
              }
              <button class="btn__submit" type="submit" [title]="formUi[0].buttonSubmit">{{ formUi[0].buttonSubmit }}</button>
            </div>
            @if(formUi[0].buttonForgot) {
              <button>Olvidaste tu contraseña?</button>
            }
            <hr />
            <div class="btn__group-vertical">
              <button class="btn__social-form">
                <img src="/assets/icons/facebook.svg" alt="">
                <div>
                  <span>
                    Facebook
                  </span>
                </div>
              </button>
              <button class="btn__social-form">
                <img src="/assets/icons/google.svg" alt="">
                <div>
                  <span>
                    Google
                  </span>
                </div>
              </button>
              <button class="btn__social-form">
                <img src="/assets/icons/apple.svg" alt="">
                <div>
                  <span>
                    Apple
                  </span>
                </div>
              </button>
            </div>
          </div>
        </form>
      </div>
  `,
  styleUrl: "./auth-form.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent {
  // Dynamic Form
  @Input() public errorMessage: string | null = null;
  @Input() public formUi!: FormUiInterface[];
  @Input() public formData!: FormDataInterface[];
  @Output() public submitEvent = new EventEmitter();
  // Icons
  public faGoogle = faGoogle;

  // Injects
  public fb = inject(FormBuilder);
  public http = inject(HttpClient);
  public authService = inject(AuthService);
  public router = inject(Router);
  public cdr = inject(ChangeDetectorRef);

  form = this.fb.nonNullable.group({
    username: ["", Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    email: ["", Validators.required, Validators.email],
    password: ["", Validators.required, Validators.minLength(8), Validators.maxLength(30)],
  });
}
