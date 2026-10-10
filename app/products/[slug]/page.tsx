import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import { formatRupiah, getProductBySlug, getProducts } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const related = (await getProducts({ category: product.category?.slug })) ?? [];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="text-sm text-stone-500">
        <Link href="/" className="hover:text-leaf-700">
          Beranda
        </Link>
        {" / "}
        <Link href="/products" className="hover:text-leaf-700">
          Produk
        </Link>
        {" / "}
        <span className="text-stone-700">{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div className="grid aspect-square place-items-center rounded-2xl border border-leaf-100 bg-gradient-to-br from-leaf-50 to-leaf-100 text-9xl">
          <span aria-hidden>{product.emoji || "🌾"}</span>
        </div>

        <div className="flex flex-col">
          {product.category && (
            <span className="text-sm font-semibold uppercase tracking-wide text-leaf-600">
              {product.category.name}
            </span>
          )}
          <h1 className="mt-1 text-3xl font-bold text-stone-800">
            {product.name}
          </h1>
          <p className="mt-3 whitespace-pre-line leading-relaxed text-stone-600">
            {product.description || "Tidak ada deskripsi."}
          </p>

          <div className="mt-6">
            <p className="text-3xl font-bold text-leaf-700">
              {formatRupiah(product.price)}
            </p>
            <p className="mt-1 text-sm text-stone-500">
              Stok: {product.stock > 0 ? `${product.stock} tersedia` : "habis"}
            </p>
          </div>

          <div className="mt-6 max-w-xs">
            <AddToCartButton product={product} big />
          </div>
        </div>
      </div>

      {related.filter((item) => item.id !== product.id).length > 0 && (
        <section className="mt-14">
          <h2 className="mb-4 text-xl font-bold text-stone-800">
            Produk Serupa
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {related
              .filter((item) => item.id !== product.id)
              .slice(0, 4)
              .map((item) => (
                <Link
                  key={item.id}
                  href={`/products/${item.slug}`}
                  className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm hover:shadow-md"
                >
                  <p className="text-4xl" aria-hidden>
                    {item.emoji || "🌾"}
                  </p>
                  <p className="mt-2 font-semibold text-stone-700">{item.name}</p>
                  <p className="text-sm text-leaf-700">
                    {formatRupiah(item.price)}
                  </p>
                </Link>
              ))}
          </div>
        </section>
      )}
    </div>
  );
}
