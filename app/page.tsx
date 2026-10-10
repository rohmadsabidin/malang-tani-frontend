import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getCategories, getProducts } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  const featured = (products ?? []).slice(0, 8);

  return (
    <div>
      <section className="bg-gradient-to-b from-leaf-700 to-leaf-600 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <p className="mb-2 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
            Kebutuhan Pertanian Malang Raya
          </p>
          <h1 className="text-3xl font-bold sm:text-5xl">
            Tumbuh Bersama, <br className="hidden sm:block" /> Panen Melimpah
            Bersama Malang Tani
          </h1>
          <p className="mt-4 max-w-xl text-leaf-100">
            Sedia benih unggul, pupuk organik & anorganik, alat pertanian, dan
            pestisida aman — semua untuk kebutuhan kebun dan sawah Anda.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/products"
              className="rounded-lg bg-white px-5 py-2.5 font-semibold text-leaf-700 hover:bg-leaf-50"
            >
              Belanja Sekarang
            </Link>
            {categories && categories.length > 0 && (
              <Link
                href={`/products?category=${categories[0].slug}`}
                className="rounded-lg border border-white/40 px-5 py-2.5 font-semibold hover:bg-white/10"
              >
                Lihat Kategori
              </Link>
            )}
          </div>
        </div>
      </section>

      {categories && categories.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-10">
          <h2 className="mb-4 text-xl font-bold text-stone-800">Kategori</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.slug}`}
                className="rounded-xl border border-stone-200 bg-white p-4 text-center shadow-sm hover:border-leaf-500 hover:shadow"
              >
                <p className="font-semibold text-stone-700">{category.name}</p>
                {category.description && (
                  <p className="mt-1 text-xs text-stone-400">
                    {category.description}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-stone-800">Produk Pilihan</h2>
          <Link
            href="/products"
            className="text-sm font-semibold text-leaf-700 hover:underline"
          >
            Lihat semua →
          </Link>
        </div>

        {featured.length === 0 ? (
          <div className="rounded-xl border border-dashed border-stone-300 bg-white p-10 text-center text-stone-500">
            <p className="text-3xl">🌱</p>
            <p className="mt-2 font-medium">Belum ada produk</p>
            <p className="text-sm">
              Jalankan backend lalu tambahkan produk dari CMS Malang Tani.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
