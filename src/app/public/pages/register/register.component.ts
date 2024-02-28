import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AuthService } from "../../../core/services/auth.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthFormComponent } from "../../components/auth-form/auth-form.component";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, AuthFormComponent],
  template: `
    <div class="register">
      <img src="https://cdn.wallpapersafari.com/82/74/wqM8gj.jpg" alt="" />
      <app-auth-form
        [formUi]="FormUi"
        [formData]="FormData"
        [errorMessage]="errorMessage"
      ></app-auth-form>
    </div>
  `,
  styleUrl: "./register.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  public errorMessage: string | null = null;

  public fb = inject(FormBuilder);
  public http = inject(HttpClient);
  public authService = inject(AuthService);
  public router = inject(Router);
  public cdr = inject(ChangeDetectorRef);

  public FormUi: any[] = [
    {
      title: "Crea una cuenta",
      buttonSubmit: "Crear Cuenta",
      buttonSwitch: {
        login: false,
        label: "Iniciar sesión",
        link: "/login",
      },
      buttonForgot: false,
    },
  ];
  public FormData: any[] = [
    {
      name: "username",
      type: "text",
      placeholder: "Username",
      control: new FormControl(""),
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    },
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      control: new FormControl(""),
      validators: [Validators.required, Validators.email],
    },
    {
      name: "password",
      type: "password",
      placeholder: "Password",
      control: new FormControl(""),
      validators: [Validators.required, Validators.minLength(8), Validators.maxLength(30)],
    },
  ];

  form = this.fb.nonNullable.group({
    username: ["", Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    email: ["", Validators.required, Validators.email],
    password: ["", Validators.required, Validators.minLength(8), Validators.maxLength(30)],
  });

  public onSubmit(): void {
    const rawForm = this.form.getRawValue();
    this.authService
      .register(rawForm.username, rawForm.email, rawForm.password)
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/')
        },
        error: (error) => {
          this.errorMessage = error;
          this.cdr.detectChanges();
        },
    });
  }
}
