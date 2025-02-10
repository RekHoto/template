import { AxiosError } from "axios";
import { AlertType } from "@/models/components/AlertI";
import { useAlert } from "@/store/alert";

type ErrorType = AxiosError | string;

type ApiError = {
  detail: string;
};

function getErrorText(error: ErrorType): string {
  const isString = typeof error === "string";
  if (error && isString) {
    return error;
  }

  const isAxiosError =
    typeof error === "object" &&
    "isAxiosError" in error &&
    error.isAxiosError &&
    error.response;

  if (isAxiosError) {
    const responseData = error.response.data as ApiError;
    if (responseData) return responseData.detail;
    return error.message;
  }

  return "Unknown error";
}

type AlertOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
  text?: string;
  type?: AlertType;
};

export function showAlert({ error, text, type }: AlertOptions): void {
  const content = error ? getErrorText(error) : text || "";
  const t = type || "success";
  const alertType = error ? "error" : t;

  useAlert.getState().show({ type: alertType, text: content });
}
