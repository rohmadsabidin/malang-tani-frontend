"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { apiPost, formatRupiah, API_URL } from "@/lib/api";

export default function CartPage() {
  const { items, total, ready, setQty, remove, clear } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await apiPost<{ message: string }>("/orders", {
        customerName,
        phone,
        address,
        items: items.map((i) => ({ productId: i.productId, qty: i.qty })),
      });
      setSuccess(true);
      clear();
      console.log(res.message);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Gagal mengirim pesanan. Pastikan backend berjalan di " + API_URL,
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (!ready) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center text-stone-400">
        Memuat keranjang…
      </div>
    );
  }

  if (success) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-5xl">🌿</p>
        <h1 className="mt-4 text-2xl font-bold text-leaf-800">
          Pesanan Berhasil Dikirim!
        </h1>
        <p className="mt-2 text-stone-600">
          Terima kasih, {customerName || "Sahabat Tani"}. Kami akan menghubungi
          Anda melalui WhatsApp untuk konfirmasi pesanan.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-lg bg-leaf-600 px-5 py-2.5 font-semibold text-white hover:bg-leaf-700"
        >
          Lanjut Belanja
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg px-4 py-20 text-center">
        <p className="text-5xl">🛒</p>
        <h1 className="mt-4 text-2xl font-bold text-stone-800">
          Keranjang Masih Kosong
        </h1>
        <p className="mt-2 text-stone-600">
          Yuk mulai belanja kebutuhan pertanian Anda.
        </p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded-lg bg-leaf-600 px-5 py-2.5 font-semibold text-white hover:bg-leaf-700"
        >
          Lihat Produk
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-stone-800">Keranjang Belanja</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_380px]">
        <ul className="divide-y divide-stone-200 rounded-xl border border-stone-200 bg-white">
          {items.map((item) => (
            <li key={item.productId} className="flex items-center gap-4 p-4">
              <span className="grid h-16 w-16 shrink-0 place-items-center rounded-lg bg-leaf-50 text-3xl" aria-hidden>
                {item.emoji || "🌾"}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-stone-800">
                  {item.name}
                </p>
                <p className="text-sm text-stone-500">
                  {formatRupiah(item.price)} / item
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQty(item.productId, item.qty - 1)}
                  className="h-8 w-8 rounded-lg border border-stone-300 font-bold text-stone-600 hover:bg-stone-50"
                  aria-label="Kurangi"
                >
                  −
                </button>
                <span className="w-8 text-center font-semibold">{item.qty}</span>
                <button
                  onClick={() => setQty(item.productId, item.qty + 1)}
                  className="h-8 w-8 rounded-lg border border-stone-300 font-bold text-stone-600 hover:bg-stone-50"
                  aria-label="Tambah"
                >
                  +
                </button>
              </div>
              <div className="w-28 text-right font-bold text-leaf-700">
                {formatRupiah(item.price * item.qty)}
              </div>
              <button
                onClick={() => remove(item.productId)}
                className="text-stone-300 transition hover:text-red-500"
                aria-label="Hapus item"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        <form
          onSubmit={handleCheckout}
          className="h-fit space-y-3 rounded-xl border border-stone-200 bg-white p-5 shadow-sm"
        >
          <h2 className="text-lg font-bold text-stone-800">Data Pemesan</h2>
          <div className="flex items-center justify-between border-t border-stone-100 pt-3 text-stone-600">
            <span>Total</span>
            <span className="text-xl font-bold text-leaf-700">
              {formatRupiah(total)}
            </span>
          </div>

          <div>
            <label className="text-sm font-medium text-stone-600">Nama</label>
            <input
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-leaf-500"
              placeholder="Nama lengkap"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-stone-600">
              No. WhatsApp
            </label>
            <input
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-leaf-500"
              placeholder="08xxxxxxxxxx"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-stone-600">
              Alamat Kirim
            </label>
            <textarea
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-leaf-500"
              placeholder="Alamat lengkap pengiriman"
            />
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-leaf-600 px-4 py-2.5 font-semibold text-white transition hover:bg-leaf-700 disabled:opacity-60"
          >
            {submitting ? "Mengirim…" : "Checkout via Pesanan"}
          </button>
          <p className="text-center text-xs text-stone-400">
            Pesanan akan diteruskan ke admin Malang Tani.
          </p>
        </form>
      </div>
    </div>
  );
}
