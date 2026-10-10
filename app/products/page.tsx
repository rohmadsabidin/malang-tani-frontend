import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getCategories, getProducts } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: { search?: string; category?: string };
}) {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(searchParams),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-stone-800">Semua Produk</h1>

      <form className="mt-4 flex flex-wrap gap-2" action="/products">
        <input
          type="search"
          name="search"
          defaultValue={searchParams?.search ?? ""}
          placeholder="Cari produk… (mis. benih, pupuk)"
          className="w-full max-w-xs rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-leaf-500"
        />
        {searchParams?.category && (
          <input type="hidden" name="category" value={searchParams.category} />
        )}
        <button
          type="submit"
          className="rounded-lg bg-leaf-600 px-4 py-2 text-sm font-semibold text-white hover:bg-leaf-700"
        >
          Cari
        </button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        <Link
          href="/products"
          className={`rounded-full border px-3 py-1 text-xs font-medium ${
            !searchParams?.category
              ? "border-leaf-600 bg-leaf-600 text-white"
              : "border-stone-300 bg-white text-stone-600 hover:border-leaf-500"
          }`}
        >
          Semua
        </Link>
        {(categories ?? []).map((category) => (
          <Link
            key={category.id}
            href={`/products?category=${category.slug}`}
            className={`rounded-full border px-3 py-1 text-xs font-medium ${
              searchParams?.category === category.slug
                ? "border-leaf-600 bg-leaf-600 text-white"
                : "border-stone-300 bg-white text-stone-600 hover:border-leaf-500"
            }`}
          >
            {category.name}
          </Link>
        ))}
      </div>

      {!products || products.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-stone-300 bg-white p-10 text-center text-stone-500">
          <p className="text-3xl">🔍</p>
          <p className="mt-2 font-medium">Produk tidak ditemukan</p>
          <p className="text-sm">Coba kata kunci atau kategori lain.</p>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
