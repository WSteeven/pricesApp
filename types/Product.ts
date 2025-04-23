import { UnitMeasure } from "./UnitMeasure";

export interface Product  {
    id?: number,
    name: string,
    price: number,
    unit_id: number,
    units_measures?: UnitMeasure
  };
