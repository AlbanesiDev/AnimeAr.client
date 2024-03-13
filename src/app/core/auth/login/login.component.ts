import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from "@angular/core";
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { AuthFormComponent } from "../auth-form/auth-form.component";
import { FormDataInterface, FormUiInterface } from "../../interfaces/form.interface";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AuthFormComponent],
  template: `
    <div class="register">
      <img src="/assets/gif/login-1.gif" alt="" />
      <app-auth-form
        [formUi]="FormUi"
        [formData]="FormData"
        [errorMessage]="errorMessage"
        (submitEvent)="onSubmit($event)"
      ></app-auth-form>
    </div>
  `,
  styleUrl: "./login.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  public authService = inject(AuthService);
  public router = inject(Router);
  public cdr = inject(ChangeDetectorRef);
  public errorMessage: string | null = null;
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
      autocomplete: "email",
      name: "email",
      type: "email",
      placeholder: "email@address.com",
      control: new FormControl(""),
      focus: true,
      controlName: "email",
      validators: [Validators.required, Validators.email],
    },
    {
      autocomplete: "current-password",
      name: "password",
      type: "password",
      placeholder: "*********",
      showBtn: true,
      control: new FormControl(""),
      controlName: "password",
      validators: [Validators.required, Validators.minLength(8), Validators.maxLength(30)],
    },
  ];

  public onSubmit(formValue: any): void {
    this.authService.loginWithEmail(formValue).subscribe({
      next: () => {
        this.router.navigateByUrl("/");
      },
      error: (error) => {
        this.errorMessage = error;
        this.cdr.detectChanges();
      },
    });
  }
}
