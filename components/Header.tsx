"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/products", label: "Produk" },
];

export default function Header() {
  const { items } = useCart();
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className="sticky top-0 z-10 border-b border-leaf-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-leaf-600 text-lg">
            🌱
          </span>
          <span className="text-lg font-bold text-leaf-800">Malang Tani</span>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-sm font-medium text-stone-600 hover:bg-leaf-50 hover:text-leaf-800"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/cart"
            className="relative rounded-md bg-leaf-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-leaf-700"
          >
            🛒 Keranjang
            {itemCount > 0 && (
              <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-amber-500 text-xs font-bold text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
