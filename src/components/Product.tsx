import Link from 'next/link';
import Image from 'next/image';
import AddToCartButton from './AddToCart';
import { useAppDispatch } from '@/hooks/hooks';
import { CartItem, addToCartAsync } from '@/store/CartSlice';
import { createHash } from 'crypto';

interface Product {
  name: string;
  link: string;
  current_price: number;
  original_price: number;
  discounted: boolean;
  thumbnail: string;
}

interface ProductsProps {
  products: Product[];
}

function generateProductId(product: Product): string {
  const uniqueString = `${product.name}-${product.link}-${product.current_price}`;
  return createHash('md5').update(uniqueString).digest('hex');
}

export const Products = ({ products }: ProductsProps) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = (product: Product) => {
    dispatch(addToCartAsync({
      productId: generateProductId(product),
      name: product.name,
      price: product.current_price,
      image: product.thumbnail,
    }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, index) => {
        const productId = generateProductId(product);
        return (
          <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105">
            <Link href={product.link} target="_blank" rel="noopener noreferrer" className="block aspect-square relative overflow-hidden">
              <Image
                src={product.thumbnail}
                alt={product.name}
                layout="fill"
                objectFit="contain"
                className="transition-transform hover:scale-103"
                unoptimized
              />
            </Link>
            <div className="p-4">
              <Link href={product.link} target="_blank" rel="noopener noreferrer" className="block">
                <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">{product.name}</h2>
              </Link>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <span className="text-xl font-bold text-[#373737]">₹{product.current_price.toLocaleString()}</span>
                  {product.discounted && (
                    <span className="text-sm text-gray-500 line-through ml-2">₹{product.original_price.toLocaleString()}</span>
                  )}
                </div>
                {product.discounted && (
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                    {Math.round((1 - product.current_price / product.original_price) * 100)}% OFF
                  </span>
                )}
              </div>
              <AddToCartButton
                product={{
                  productId: generateProductId(product),
                  name: product.name,
                  price: product.current_price,
                  image: product.thumbnail,
                }}
              />
            </div>
          </div>
        )
      })}
    </div>
  );
};

export default Products;
