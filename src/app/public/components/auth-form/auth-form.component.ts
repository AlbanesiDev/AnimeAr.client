import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, inject,
} from "@angular/core";
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
      <form class="form" [formGroup]="form">
        <div class="container">
          <div class="form__group">
            @for (item of formData; track $index) {
              <input
                [type]="formData[$index].type"
                [name]="formData[$index].name"
                [placeholder]="formData[$index].placeholder"
                [formControlName]="formData[$index].controlName"
                [autocomplete]="formData[$index].autocomplete"
              />

            }
            <button class="btn__submit" type="submit" [title]="formUi[0].buttonSubmit" (click)="onSubmit()">
              {{ formUi[0].buttonSubmit }}
            </button>
          </div>
          @if (formUi[0].buttonForgot) {
            <button>Olvidaste tu contraseña?</button>
          }
          <hr />
          <div class="btn__group-vertical">
            <button class="btn__social-form">
              <img src="/assets/icons/facebook.svg" alt="" />
              <div>
                <span> Facebook </span>
              </div>
            </button>
            <button class="btn__social-form" (click)="signInWithGoogle()">
              <img src="/assets/icons/google.svg" alt="" />
              <div>
                <span> Google </span>
              </div>
            </button>
            <button class="btn__social-form">
              <img src="/assets/icons/apple.svg" alt="" />
              <div>
                <span> Apple </span>
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
export class AuthFormComponent implements OnInit {
  // Dynamic Form
  @Input() public errorMessage: string | null = null;
  @Input() public formUi!: FormUiInterface[];
  @Input() public formData!: FormDataInterface[];
  @Output() public submitEvent = new EventEmitter();
  // Icons
  public faGoogle = faGoogle;
  // Injects
  public fb = inject(FormBuilder);
  public authService = inject(AuthService);
  public router = inject(Router);
  public cdr = inject(ChangeDetectorRef);
  // Variables
  public form = this.fb.group({});

  ngOnInit() {
    const formControls: {[key: string]: any} = {};
    this.formData.forEach((field) => {
      formControls[field.controlName] = ["", field.validators];
    });
    this.form = this.fb.group(formControls);
    this.cdr.detectChanges();
  }

  onSubmit(){
    if(this.form.valid){
      this.submitEvent.emit(this.form.value);
    }
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }
}
