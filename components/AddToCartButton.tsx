"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/types";

export default function AddToCartButton({
  product,
  qty,
  big,
}: {
  product: Product;
  qty?: number;
  big?: boolean;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    add(product, qty ?? 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  if (product.stock <= 0) {
    return (
      <button
        disabled
        className={
          big
            ? "w-full cursor-not-allowed rounded-lg bg-stone-200 px-4 py-2.5 font-semibold text-stone-400"
            : "mt-3 w-full cursor-not-allowed rounded-lg bg-stone-200 px-3 py-1.5 text-sm font-semibold text-stone-400"
        }
      >
        Stok Habis
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className={
        big
          ? "w-full rounded-lg bg-leaf-600 px-4 py-2.5 font-semibold text-white transition hover:bg-leaf-700"
          : "mt-3 w-full rounded-lg bg-leaf-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-leaf-700"
      }
    >
      {added ? "✓ Masuk Keranjang" : "+ Keranjang"}
    </button>
  );
}
