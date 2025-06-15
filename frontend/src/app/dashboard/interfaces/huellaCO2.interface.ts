
export interface HuellaCO2 {
  electricidad: number;
  agua: number;
  diesel: number;
  gasolina: number;
  butano: number;
  gasNatural: number;
  total: number;
  [key: string]: number;
}
