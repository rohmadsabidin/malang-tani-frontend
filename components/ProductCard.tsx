import Link from "next/link";
import { formatRupiah } from "@/lib/api";
import type { Product } from "@/lib/types";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition hover:shadow-md">
      <Link
        href={`/products/${product.slug}`}
        className="grid aspect-[4/3] place-items-center bg-gradient-to-br from-leaf-50 to-leaf-100 text-6xl"
      >
        <span aria-hidden>{product.emoji || "🌾"}</span>
      </Link>
      <div className="flex flex-1 flex-col gap-1 p-4">
        {product.category && (
          <span className="text-xs font-medium uppercase tracking-wide text-leaf-600">
            {product.category.name}
          </span>
        )}
        <Link
          href={`/products/${product.slug}`}
          className="font-semibold text-stone-800 hover:text-leaf-700"
        >
          {product.name}
        </Link>
        <p className="text-sm text-stone-500">
          Stok: {product.stock > 0 ? product.stock : "habis"}
        </p>
        <div className="mt-auto pt-2">
          <p className="text-lg font-bold text-leaf-700">
            {formatRupiah(product.price)}
          </p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
