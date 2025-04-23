import { useEffect, useState } from "react";
import { UnitMeasure } from "../types/UnitMeasure";
import { getAllMeasures } from "../services/units_measures";

export const useMeasures = () => {
const [units, setUnits] = useState<UnitMeasure[]>([]);

useEffect(() => {
    const fetchUnits = async () => {
      try {
        const data = await getAllMeasures()
        setUnits(data||[]);
      } catch (error) {
        console.error("Error fetching units:", error);
      }
    };

    fetchUnits();
  },[])

  return { units };
}
    