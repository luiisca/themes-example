// pages/index.tsx
import { FiShoppingCart } from "react-icons/fi";

const ToggleButton = ({
  onClick,
  selectedTheme,
}: {
  onClick: () => void;
  selectedTheme: string | undefined;
}) => {
  return (
    <button
      aria-label="Toggle Dark Mode"
      type="button"
      className="flex items-center justify-center bg-gray-200 rounded-lg w-9 h-9 dark:bg-gray-600 hover:ring-2 ring-gray-300 transition-all"
      onClick={onClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="w-5 h-5 text-gray-800 dark:text-gray-200"
      >
        {selectedTheme === "dark" ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        )}
      </svg>
    </button>
  );
};

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { shimmer, toBase64 } from "../utils/blur-effect";
import { generateProducts } from "../utils/gen-card-data";

const Page = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => setMounted(true));

  return (
    <div className="py-0 px-8">
      <div className="flex flex-col justify-center px-8 w-full max-w-6xl mx-auto mb-8">
        <nav className="relative flex items-center justify-between w-full pt-8 pb-8 mx-auto text-gray-900 border-gray-200 dark:border-gray-700 sm:pb-16">
          <span className="text-gray-700 dark:text-gray-200 p-1 sm:px-3 sm:py-2 ">
            Current theme: {mounted && resolvedTheme}
          </span>
          <ToggleButton
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            selectedTheme={resolvedTheme}
          />
        </nav>
        <ProductsGrid />
      </div>
    </div>
  );
};

const ProductsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
      {generateProducts().map((product) => (
        <div
          key={product.id}
          className="bg-white border hover:shadow-sm transition-all cursor-pointer border-gray-50 rounded-lg p-6 dark:bg-gray-800 dark:border-gray-600"
        >
          <div className="relative w-full h-80">
            <Image
              src={product.imageUrl}
              alt={product.title}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475)
              )}`}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <h2 className="font-bold text-xl mt-2">{product.title}</h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {product.subtitle}
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            {product.description}
          </p>
          <div className="flex space-x-2 mt-4">
            <button className="py-2 px-4 rounded-full bg-blue-500 text-white font-bold dark:bg-blue-800">
              Buy
            </button>
            <button className="p-1 h-9 w-9 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-bold dark:bg-gray-400">
              <FiShoppingCart />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Page;
