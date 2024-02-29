import { FormControl, Validators } from "@angular/forms";

export interface FormUiInterface {
  title: string;
  buttonSubmit: string;
  buttonSwitch: ButtonSwitch;
  buttonForgot: boolean;
}

export interface ButtonSwitch {
  login: boolean;
  label: string;
  link: string;
}

export interface FormDataInterface {
  name: string;
  type: string;
  placeholder: string;
  control: FormControl;
  controlName: string;
  autocomplete: string;
  validators: Validators[];
  showBtn?: boolean;
}
