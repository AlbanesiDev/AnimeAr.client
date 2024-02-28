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
  control: any;
  validators: any[];
  showPassword?: boolean;
}
