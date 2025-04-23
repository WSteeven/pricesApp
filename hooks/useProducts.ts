import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { deleteProduct, getAllProducts } from "../services/products";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [listadoProductos, setListadoProductos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data || []);
      setListadoProductos(data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filtrarProductos = (text: string, productosArray: Product[]) => {
    const resultados = productosArray.filter((producto) =>producto.name.toLowerCase().includes(text.toLowerCase()));
    setListadoProductos(resultados);
  }

  const eliminarProducto = async (id: number) => {
    try {
        const success = await deleteProduct(id);
        if(success){
            setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
            setListadoProductos((prevProducts) => prevProducts.filter((product) => product.id !== id));
        }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
    
}

const refetchProductos = ()=>{
    fetchProducts()
}
useEffect(() => {
    fetchProducts();
  }
, []);
  return { products, listadoProductos, loading , filtrarProductos, eliminarProducto, refetchProductos };
};
