import React from "react";
import { toast } from "sonner";
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from "@/store/Store";
import { CartItem, addToCartAsync } from "@/store/CartSlice";
import { useSession } from "next-auth/react";

interface AddToCartButtonProps {
  product: {
    productId: string;
    name: string;
    price: number;
    image: string;
  };
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isAdded = cartItems.some(item => item.productId === product.productId);

  const handleAddToCart = async () => {
    if (!session) {
      // If the user is not authenticated, show an error message
      toast.error("Please log in to add products to your cart", { style: { background: 'red', color: 'white' } });
      return;
    }

    if (!isAdded) {
      try {
        const resultAction = await dispatch(addToCartAsync(product));
        if (addToCartAsync.fulfilled.match(resultAction)) {
          toast.success("Product added to cart", { style: { background: 'green', color: 'white' } });
        } else {
          throw new Error("Failed to add product");
        }
      } catch (error) {
        console.error("Error adding product to cart:", error);
        toast.error("Failed to add product to cart", { style: { background: 'red', color: 'white' } });
      }
    }
  };

  return (
    <button
      onClick={handleAddToCart}
      className={`w-full font-semibold py-3 px-6 rounded-md transition-colors duration-300 flex items-center justify-center text-lg ${
        isAdded
          ? "bg-gray-400 text-white cursor-not-allowed"
          : "bg-red-600 hover:bg-red-700 text-white"
      }`}
      disabled={isAdded}
    >
      <span>{isAdded ? "Added to Cart" : "Add to Cart"}</span>
      {!isAdded && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ml-2"
        >
          <circle cx="8" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
      )}
    </button>
  );
};

export default AddToCartButton;
