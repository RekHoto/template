export type AlertType = "success" | "error" | "info";

export interface AlertI {
  text: string;
  type: AlertType;
}
