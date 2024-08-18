"use client";
import { useEffect, useState } from 'react';
import Products from "@/components/Product";
import { useAppSelector } from '@/hooks/hooks';
import {BeatLoader} from 'react-spinners';
interface Product {
  name: string;
  link: string;
  current_price: number;
  original_price: number;
  discounted: boolean;
  thumbnail: string;
  description: string;
}

interface ApiResponse {
  total_result: number;
  query: string;
  fetch_from: string;
  result: Product[];
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchQuery = useAppSelector((state) => state.search.query) || "samsung";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/flipkart/${encodeURIComponent(searchQuery)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: ApiResponse = await response.json();
        console.log("Data fetched is: ", data);
        const productsWithDescription = data.result.map(product => ({
          ...product,
          description: product.name // or any other default description
        }));
        setProducts(productsWithDescription);
      } catch (err) {
        setError('Error fetching products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <BeatLoader size={24} color="#373737" />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <main className="pt-14">
      <Products products={products} />
    </main>
  );
}
