import supabase from "../config/supabase";
import { UnitMeasure } from "../types/UnitMeasure";

//Fetch all productos
export const getAllMeasures= async () => {
  try {
    const { data, error } = await supabase
      .from("units_measures")
      .select("*")
      .order("id", { ascending: true });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

//Fetch a single product by id}
export const getMeasureById = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from("units_measures")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching units_measures:", error);
    return null;
  }
};

//Create a new product
export const createMeasure = async (measure: UnitMeasure) => {
  try {
    const { error } = await supabase.from("units_measures").insert([measure]);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error creating units_measures:", error);
    return false;
  }
};

//Update an existing product
export const updateMeasure = async (id: number, measure: UnitMeasure) => {
  try {
    const { error } = await supabase
      .from("units_measures")
      .update(measure)
      .eq("id", id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error updating units_measures:", error);
    return false;
  }
};

//Delete a product by ID
export const deleteMeasure= async (id: number) => {
  try {
    const { error } = await supabase.from("units_measures").delete().eq("id", id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting units_measures:", error);
    return false;
  }
};
