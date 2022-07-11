export interface IButtonProp {
  id?: string;
  text?: string;
  type?: "button" | "reset" | "submit" | undefined;
  size?: "small" | "medium" | "large";
  color?: "inherit" | "default" | "primary" | "secondary" | undefined;
  variant?: "text" | "contained";
  onClick?: () => void;
}
export interface IInput {
  id?: string;
  name: string;
  label?: string;
  value?: string;
  cName?: string;
  onChange?: (e: any) => void | undefined;
  variant?: "outlined" | "filled";
  error?: any;
}

