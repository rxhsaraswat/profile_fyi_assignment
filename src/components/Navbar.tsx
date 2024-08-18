"use client";

import { Session } from "next-auth";
import { useEffect, useState } from "react";
import SearchInput from "./SearchInput";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { signOut, useSession } from "next-auth/react";
import { fetchCart } from "@/store/CartSlice";



  export const Navbar = () => {
    const { data: session, status } = useSession();
    const [isHeaderOpen, setIsHeaderOpen] = useState(false);
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((state) => state.cart.items);
    const totalItemsCart = cartItems.reduce((total, item) => total + item.quantity, 0);

    useEffect(() => {
      dispatch(fetchCart());
    }, [dispatch]);

    const toggleHeader = () => {
      document.body.style.overflow = "auto";
      setIsHeaderOpen(!isHeaderOpen);
    };

    return (
      <header className="pointer-events-auto w-full px-3.5 gap-4 xs:px-6 sm:px-12 py-6 flex items-center justify-between bg-background-secondary border-b border-solid border-border-primary">
        <button
          onClick={() => {
            toggleHeader();
            document.body.style.overflow = "hidden";
          }}
          className="flex px-4 py-2 lg:hidden"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>

        <Link href="/">
        <img src="https://p1.edge.duggup.com/logo/profile-transparent-blue.svg" width={100} className=""/>
        </Link>

        <SearchInput />

        <ul className="flex gap-2">
          <li className="flex items-center justify-center">
            <Link
              href="/cart"
              aria-label="Products saved in the shopping cart"
              className="text-sm py-3 px-3 rounded-md transition-all text-[#373737] hover:bg-[#ffd27f] relative"
            >
              <svg
                data-testid="geist-icon"
                height="16"
                strokeLinejoin="round"
                viewBox="0 0 16 16"
                width="16"
                style={{ color: "currentColor" }}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 2.5L0.958427 2.5C1.41012 2.5 1.82194 2.74308 2.04258 3.12774L2.5 4.5L3.93019 8.79057C4.27047 9.81142 5.22582 10.5 6.3019 10.5H12.4505C13.6422 10.5 14.6682 9.65885 14.9019 8.49029L15.7 4.5L16 3H14.4703L4.5 3L3.62309 3L3.50287 2.70678C3.07956 1.67431 2.0743 1 0.958427 1H0V2.5ZM4.08114 4.5L5.35321 8.31623C5.48933 8.72457 5.87147 9 6.3019 9H12.4505C12.9272 9 13.3376 8.66354 13.4311 8.19612L14.1703 4.5H4.5H4.08114ZM12.5 15C11.6716 15 11 14.3284 11 13.5C11 12.6716 11.6716 12 12.5 12C13.3284 12 14 12.6716 14 13.5C14 14.3284 13.3284 15 12.5 15ZM4.5 13.5C4.5 14.3284 5.17157 15 6 15C6.82843 15 7.5 14.3284 7.5 13.5C7.5 12.6716 6.82843 12 6 12C5.17157 12 4.5 12.6716 4.5 13.5Z"
                  fill="currentColor"
                ></path>
              </svg>
              <span className="flex items-center bg-[#f51000] font-medium text-[#fbf08c] justify-center absolute w-[20px] rounded-full top-[-3px] right-[-3px]">
                {totalItemsCart}
              </span>
            </Link>
          </li>
        </ul>
        {status === "loading" ? (
          <p>Loading...</p>
        ) : session ? (
          <button onClick={() => signOut()}>Logout</button>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </header>
    );
  };
