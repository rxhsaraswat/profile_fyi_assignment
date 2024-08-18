import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { setSearchQuery } from "@/store/SearchSlice";

const SearchInput = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.search.query);
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleSearch = () => {
    dispatch(setSearchQuery(inputValue));
    if (inputValue) {
      router.push(`/?q=${encodeURIComponent(inputValue)}`);
    } else {
      router.push("/");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex w-full border bg-[#f3e7d7] border-[#2E2E2E] rounded-md overflow-hidden">
      <input
        placeholder="Search Products..."
        aria-label="Search"
        className="w-full h-[40px] px-3 bg-[#f4f4f496] text-sm focus:outline-none"
        type="search"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button
        onClick={handleSearch}
        className="h-[40px] w-[40px] px-3 flex items-center justify-center bg-[#e0d0b8] hover:bg-[#d0c0a8] transition-colors"
        aria-label="Search"
      >
        <svg
          data-testid="geist-icon"
          height="16"
          strokeLinejoin="round"
          viewBox="0 0 16 16"
          width="16"
          style={{ color: "currentcolor" }}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M1.5 6.5C1.5 3.73858 3.73858 1.5 6.5 1.5C9.26142 1.5 11.5 3.73858 11.5 6.5C11.5 9.26142 9.26142 11.5 6.5 11.5C3.73858 11.5 1.5 9.26142 1.5 6.5ZM6.5 0C2.91015 0 0 2.91015 0 6.5C0 10.0899 2.91015 13 6.5 13C8.02469 13 9.42677 12.475 10.5353 11.596L13.9697 15.0303L14.5 15.5607L15.5607 14.5L15.0303 13.9697L11.596 10.5353C12.475 9.42677 13 8.02469 13 6.5C13 2.91015 10.0899 0 6.5 0Z"
            fill="currentColor"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default SearchInput;
