
export interface HuellaCO2 {
  electricidad: number;
  agua: number;
  gasoleo: number;
  gasolina: number;
  gasbutano: number;
  gasnatural: number;
  total: number;
  [key: string]: number;
}
