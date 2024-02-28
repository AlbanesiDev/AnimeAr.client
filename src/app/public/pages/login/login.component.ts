import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from "@angular/core";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../../core/services/auth.service";
import { Router } from "@angular/router";
import { AuthFormComponent } from "../../components/auth-form/auth-form.component";
import { FormDataInterface, FormUiInterface } from "../../models/form.interface";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AuthFormComponent],
  template: `
    <div class="register">
      <img src="/assets/background/naruto.jpg" alt="" />
      <app-auth-form
        [formUi]="FormUi"
        [formData]="FormData"
        [errorMessage]="errorMessage"
      ></app-auth-form>
    </div>
  `,
  styleUrl: "./login.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public FormUi: FormUiInterface[] = [
    {
      title: "Inicia sesión",
      buttonSubmit: "Iniciar sesión",
      buttonSwitch: {
        login: true,
        label: "Registrarse",
        link: "/register",
      },
      buttonForgot: true,
    },
  ];
  public FormData: FormDataInterface[] = [
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
      showPassword: false,
      control: new FormControl(""),
      validators: [Validators.required, Validators.minLength(8), Validators.maxLength(30)],
    },
  ];
  public errorMessage: string | null = null;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  // public onSubmit(): void {
  //   const rawForm = this.form.getRawValue();
  //   this.authService.login(rawForm.email, rawForm.password).subscribe({
  //     next: () => {
  //       this.router.navigateByUrl("/");
  //     },
  //     error: (error) => {
  //       this.errorMessage = error;
  //       this.cdr.detectChanges();
  //     },
  //   });
  // }
}
