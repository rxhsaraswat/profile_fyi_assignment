'use client';

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCart } from "@/store/CartSlice";
import { AppDispatch } from "@/store/Store";

// This portion is basically allowing redux to give access to cart data to all the children such as products page, cart page and navbar
export default function AppInitializer({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return <>{children}</>;
}
