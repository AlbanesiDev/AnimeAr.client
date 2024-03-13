import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { AuthService } from "../auth.service";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { AuthFormComponent } from "../auth-form/auth-form.component";
import { FormDataInterface } from "../../interfaces/form.interface";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule, AuthFormComponent],
  template: `
    <div class="register">
      <img src="/assets/gif/login.gif" alt="" />
      <app-auth-form
        [formUi]="FormUi"
        [formData]="FormData"
        [errorMessage]="errorMessage"
        (submitEvent)="onSubmit($event)"
      ></app-auth-form>
    </div>
  `,
  styleUrl: "./register.component.scss",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  public authService = inject(AuthService);
  public router = inject(Router);
  public cdr = inject(ChangeDetectorRef);
  public errorMessage: string | null = null;
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
  public FormData: FormDataInterface[] = [
    {
      autocomplete: "off",
      name: "username",
      type: "text",
      placeholder: "Username",
      control: new FormControl(""),
      controlName: "username",
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    },
    {
      autocomplete: "off",
      name: "email",
      type: "email",
      placeholder: "Email",
      control: new FormControl(""),
      controlName: "email",
      validators: [Validators.required, Validators.email],
    },
    {
      autocomplete: "off",
      name: "password",
      type: "password",
      placeholder: "Password",
      control: new FormControl(""),
      controlName: "password",
      validators: [Validators.required, Validators.minLength(8), Validators.maxLength(30)],
    },
  ];

  public onSubmit(formValue: any): void {
    this.authService.registerWithEmail(formValue).subscribe({
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
