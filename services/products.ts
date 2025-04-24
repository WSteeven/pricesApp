import supabase from "../config/supabase";
import { Product } from "../types/Product";

//Fetch all productos
export const getAllProducts = async () => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*, units_measures(name, abbreviation)")
      .order("name", { ascending: true });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

//Fetch a single product by id}
export const getProductById = async (id: number) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};

//Create a new product
export const createProduct = async (product: Product) => {
  try {
    const { error } = await supabase.from("products").insert([product]);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error creating product:", error);
    return false;
  }
};

//Update an existing product
export const updateProduct = async (id: number, product: Product) => {
  try {
    const { error } = await supabase
      .from("products")
      .update(product)
      .eq("id", id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error updating product:", error);
    return false;
  }
};

//Delete a product by ID
export const deleteProduct = async (id: number) => {
  try {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting product:", error);
    return false;
  }
};
