export type LesionClass =
  | "AKIEC"
  | "BCC"
  | "BKL"
  | "DF"
  | "HEALTHY"
  | "MEL"
  | "NV"
  | "VASC";

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
