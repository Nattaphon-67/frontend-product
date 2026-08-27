import "./App.css";
import { useState } from "react";
import { Package, Pencil, Trash2 } from "lucide-react";

function App() {
  const API_URL = "http://localhost:3000/api/products";

  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("ไม่สามารถโหลดข้อมูลสินค้าได้");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-950">
      <header className="border-b border-neutral-800 bg-neutral-950 text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-white bg-white text-neutral-950">
              <Package className="size-5" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">
                Product
              </p>
              <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
                Product Management System
              </h1>
            </div>
          </div>
          <span className="hidden text-xs font-medium uppercase tracking-widest text-neutral-400 sm:block">
            Dashboard
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 border-b border-neutral-300 pb-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Inventory workspace
          </p>
          <h2 className="text-3xl font-bold tracking-tight">Manage products</h2>
          <p className="mt-2 max-w-xl text-neutral-600">
            Add a product name and load the latest product records.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_280px]">
          <section className="border border-neutral-300 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-start justify-between border-b border-neutral-200 pb-5">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-neutral-500">
                  Product form
                </p>
                <h3 className="mt-1 text-xl font-bold">Add new product</h3>
              </div>
              <span className="border border-neutral-300 px-2 py-1 text-xs font-medium uppercase tracking-wider text-neutral-500">
                New
              </span>
            </div>

            <form
              className="max-w-xl"
              onSubmit={(event) => {
                event.preventDefault();
                fetchProducts();
              }}
            >
              <label
                className="mb-2 block text-sm font-semibold"
                htmlFor="productName"
              >
                Product name
              </label>
              <input
                className="w-full border border-neutral-300 bg-white px-4 py-3 outline-none transition placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950"
                type="text"
                id="productName"
                placeholder="Enter product name"
                value={productName}
                onChange={(event) => setProductName(event.target.value)}
              />
              <button
                className="mt-4 bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-700 disabled:cursor-not-allowed disabled:bg-neutral-400"
                type="submit"
                disabled={loading}
              >
                {loading ? "Loading..." : "Load products"}
              </button>
            </form>

            {error && (
              <div className="mt-6 border-l-4 border-neutral-950 bg-neutral-100 px-4 py-3 text-sm">
                <span>Error: {error}</span>
              </div>
            )}
          </section>

          <aside className="border border-neutral-300 bg-neutral-950 p-6 text-white">
            <p className="text-sm font-semibold uppercase tracking-widest text-neutral-400">
              Overview
            </p>
            <p className="mt-8 text-5xl font-bold">{products.length}</p>
            <p className="mt-2 text-sm text-neutral-400">Products loaded</p>
            <div className="mt-8 border-t border-neutral-700 pt-4 text-xs uppercase tracking-wider text-neutral-500">
              Live inventory count
            </div>
          </aside>
        </div>

        <section className="mt-6 border border-neutral-300 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5 sm:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-neutral-500">
                Inventory
              </p>
              <h3 className="mt-1 text-xl font-bold">Product list</h3>
            </div>
            <span className="text-sm text-neutral-500">
              {products.length} items
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase tracking-wider text-neutral-500">
                <tr>
                  <th className="px-6 py-4 font-semibold sm:px-8">รหัส</th>
                  <th className="px-6 py-4 font-semibold">ชื่อสินค้า</th>
                  <th className="px-6 py-4 font-semibold">ราคา</th>
                  <th className="px-6 py-4 text-right font-semibold sm:px-8">
                    การจัดการ
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {loading ? (
                  <tr>
                    <td
                      className="px-6 py-8 text-center text-neutral-500 sm:px-8"
                      colSpan="4"
                    >
                      Loading products...
                      <span className="loading loading-dots loading-sm ml-2 align-middle text-neutral-950" />
                    </td>
                  </tr>
                ) : products.length > 0 ? (
                  products.map((product) => (
                    <tr
                      key={product.id}
                      className="transition hover:bg-neutral-50"
                    >
                      <td className="px-6 py-4 font-mono text-neutral-500 sm:px-8">
                        {product.id}
                      </td>
                      <td className="px-6 py-4 font-medium">{product.name}</td>
                      <td className="px-6 py-4">
                        {product.price != null ? `${product.price} บาท` : "-"}
                      </td>
                      <td className="px-6 py-4 sm:px-8">
                        <div className="flex justify-end gap-2">
                          <button
                            className="inline-flex items-center gap-1 border border-neutral-300 px-3 py-2 text-xs font-semibold transition hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
                            type="button"
                            title="แก้ไขสินค้า"
                          >
                            <Pencil className="size-3.5" />
                            แก้ไข
                          </button>
                          <button
                            className="inline-flex items-center gap-1 border border-neutral-300 px-3 py-2 text-xs font-semibold transition hover:border-neutral-950 hover:bg-neutral-950 hover:text-white"
                            type="button"
                            title="ลบสินค้า"
                          >
                            <Trash2 className="size-3.5" />
                            ลบ
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      className="px-6 py-10 text-center text-neutral-500 sm:px-8"
                      colSpan="4"
                    >
                      ยังไม่มีข้อมูลสินค้า
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
