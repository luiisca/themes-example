// pages/index.tsx
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";

import { shimmer, toBase64 } from "../utils/blur-effect";
import { generateProducts } from "../utils/gen-card-data";

const themes = [
  { name: "Light" },
  { name: "Dark" },
  { name: "Gruvbox" },
  { name: "Pink" },
];

const ToggleButton = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <>
      <span className="p-1 sm:px-3 sm:py-2 text-th-secodary">
        Current theme: {mounted && theme}
      </span>
      <div>
        <label htmlFor="theme-select" className="sr-only mr-2">
          Choose theme:
        </label>
        <select
          name="theme"
          id="theme-select"
          className="bg-white text-gray-800 border-gray-800 border py-1 px-3"
          onChange={(e) => setTheme(e.currentTarget.value)}
          value={theme}
        >
          <option value="system">System</option>
          {themes.map((t) => (
            <option key={t.name.toLowerCase()} value={t.name.toLowerCase()}>
              {t.name}
            </option>
          ))}
        </select>
      </div>
    </>
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
          <h2 className="font-bold text-xl mt-2 text-gray-800">
            {product.title}
          </h2>
          <p className="text-th-accent text-sm">{product.subtitle}</p>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            {product.description}
          </p>
          <div className="flex space-x-2 mt-4">
            <button className="py-2 px-4 rounded-full bg-th-accent font-bold dark:bg-blue-800">
              Buy
            </button>
            <button className="p-1 h-9 w-9 flex items-center justify-center rounded-full bg-gray-200 text-gray-700 font-bold ">
              <FiShoppingCart />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const Page = () => {
  return (
    <div className="py-0 px-8 bg-th-primary  pb-8">
      <div className="flex flex-col justify-center px-8 w-full max-w-6xl mx-auto">
        <nav className="relative flex items-center justify-between w-full pt-8 pb-8 mx-auto text-gray-900 border-gray-200 dark:border-gray-700 sm:pb-16">
          <ToggleButton />
        </nav>
        <ProductsGrid />
      </div>
    </div>
  );
};

export default Page;
