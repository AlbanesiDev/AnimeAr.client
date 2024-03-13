import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, inject,
} from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { AuthService } from "../auth.service";
import { Router, RouterModule } from "@angular/router";
import { FormDataInterface, FormUiInterface } from "../../interfaces/form.interface";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { PasswordModule } from "primeng/password";

@Component({
  selector: "app-auth-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FontAwesomeModule, PasswordModule],
  templateUrl: './auth-form.component.html',
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
  public faEye = faEye;
  public faEyeSlash = faEyeSlash;
  // Injects
  public fb = inject(FormBuilder);
  public authService = inject(AuthService);
  public router = inject(Router);
  public cdr = inject(ChangeDetectorRef);
  // Variables
  public form = this.fb.group({});
  public showPasswordToggle: boolean = true;

  ngOnInit() {
    const formControls: { [key: string]: any } = {};
    this.formData.forEach((field) => {
      formControls[field.controlName] = ["", field.validators];
    });
    this.form = this.fb.group(formControls);
    this.cdr.detectChanges();
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitEvent.emit(this.form.value);
    }
  }

  signInWithGoogle() {
    this.authService.signInWithGoogle();
  }

  signInWithFacebook() {
    this.authService.signInWithFacebook();
  }
}
