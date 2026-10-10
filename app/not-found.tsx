import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-24 text-center">
      <p className="text-5xl">🌵</p>
      <h1 className="mt-4 text-2xl font-bold text-stone-800">
        Halaman Tidak Ditemukan
      </h1>
      <p className="mt-2 text-stone-600">
        Halaman atau produk yang Anda cari tidak tersedia.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-leaf-600 px-5 py-2.5 font-semibold text-white hover:bg-leaf-700"
      >
        Kembali ke Beranda
      </Link>
    </div>
  );
}
