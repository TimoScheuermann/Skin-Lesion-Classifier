export type LesionClass =
  | "AKIEC"
  | "BCC"
  | "BKL"
  | "DF"
  | "HEALTHY"
  | "MEL"
  | "NV"
  | "VASC";

// this order is equivalent to the order our model has (compare: Google Colab model training process)
export const lesionClasses = [
  "AKIEC",
  "BCC",
  "BKL",
  "DF",
  "HEALTHY",
  "MEL",
  "NV",
  "VASC"
] as LesionClass[];

export interface Result {
  probability: number;
  lclass: LesionClass;
}

export interface SLInformation {
  name: string;
  description: string;
}
