"use client"

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCartAsync, updateQuantityAsync, fetchCart } from '@/store/CartSlice';
import { AppDispatch, RootState } from '@/store/Store';
import CartItem from '@/components/CartItem';
import { toast } from 'sonner';
import Image from 'next/image';
import Link from 'next/link';

const CartPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: cartItems, loading, error } = useSelector((state: RootState) => state.cart);
  const [isUpdating, setIsUpdating] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleUpdateQuantity = async (id: string, quantity: number) => {
    setIsUpdating(true);
    try {
      await dispatch(updateQuantityAsync({ id, quantity })).unwrap();
    } catch (error) {
      toast.error("Failed to update quantity");
    }
    setIsUpdating(false);
  };

  const handleRemoveItem = async (id: string) => {
    setIsUpdating(true);
    try {
      await dispatch(removeFromCartAsync(id)).unwrap();
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item from cart");
    }
    setIsUpdating(false);
  };

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const discount = subtotal * (discountPercentage / 100);
  const total = subtotal - discount;

  const handleApplyDiscount = () => {
    // You can add validation here if needed
    toast.success(`Discount of ${discountPercentage}% applied`);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-2/3">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center justify-between border-b py-4">
              <div className="flex items-center">
                <img src={item.image} alt={item.name} width={80} height={80} className="object-cover mr-4" />
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <div className="flex items-center mt-2">
                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} className="text-gray-500 hover:text-gray-700">-</button>
                    <span className="mx-2">{item.quantity}</span>
                    <button onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)} className="text-gray-500 hover:text-gray-700">+</button>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-4">${(item.price * item.quantity).toFixed(2)}</span>
                <button onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:text-red-700">Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="md:w-1/3">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Order summary</h2>
            <div className="flex justify-between mb-2">
              <span>Original price</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount</span>
              <span className="text-green-500">-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg mt-4">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-blue-600 text-white py-2 rounded-md mt-4 hover:bg-blue-700 transition-colors">
              Proceed to Checkout
            </button>
            <Link href="/" className="block text-center text-blue-600 mt-2 hover:underline">
              Continue Shopping
            </Link>
            <div className="mt-4">
              <label htmlFor="discount" className="block mb-2">Enter your discount percentage below</label>
              <div className="flex">
                <input
                  type="number"
                  id="discount"
                  value={discountPercentage}
                  onChange={(e) => setDiscountPercentage(Number(e.target.value))}
                  className="border rounded-l px-2 py-1 w-full"
                  min="0"
                  max="100"
                />
                <button
                  onClick={handleApplyDiscount}
                  className="bg-blue-600 text-white px-4 py-1 rounded-r hover:bg-blue-700 transition-colors"
                >
                  Apply Code
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
