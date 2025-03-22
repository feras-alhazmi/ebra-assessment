import axios from "axios";
import { Product } from "./types/Product";
import ProductView from "./product/components/ProductView";

export default async function Home() {
  const products = await fetchProducts();
  return <ProductView products={products} />;
}

async function fetchProducts(): Promise<Product[]> {
  try {
    const res = await axios.get<Product[]>("https://fakestoreapi.com/products");
    return res.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
