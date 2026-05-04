import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  Box,
  Edit,
  Eye,
  Filter,
  Package,
  Plus,
  Search,
  Star,
  Trash2,
  Cuboid,
} from "lucide-react";
import { products } from "../../data/products";

const AdminProducts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = useMemo(() => {
    const uniqueCategories = products.map((product) => product.categoryLabel);
    return ["All", ...new Set(uniqueCategories)];
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.categoryLabel.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        product.categoryLabel === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const totalProducts = products.length;
  const arProducts = products.filter((product) => product.arSupported).length;
  const featuredProducts = products.filter((product) => product.featured).length;
  const lowStockProducts = products.filter((product) => product.stock <= 8).length;

  return (
    <div className="min-h-screen bg-[#090812] text-white">
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(153,85,255,0.28),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(153,85,255,0.18),transparent_35%)] px-5 py-6 md:px-8 lg:px-10">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <a
              href="/admin"
              className="mb-4 flex w-fit items-center gap-2 text-sm text-[#c9b6ff] transition hover:text-white"
            >
              <ArrowLeft size={17} />
              Back to Dashboard
            </a>

            <p className="mb-1 text-sm text-[#aaa2cf]">Product Management</p>

            <h1 className="text-3xl font-bold md:text-4xl">
              Admin Products
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#c9c3df]">
              Manage product inventory, pricing, stock, categories, featured
              status, and AR/3D model availability.
            </p>
          </div>

          <a
            href="/admin/products/add"
            className="flex w-fit items-center gap-2 rounded-2xl bg-gradient-to-r from-[#9955ff] to-[#7c3cff] px-5 py-3 text-sm font-bold text-white shadow-[0_0_35px_rgba(153,85,255,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_55px_rgba(153,85,255,0.55)]"
          >
            <Plus size={18} />
            Add Product
          </a>
        </header>

        {/* Summary Cards */}
        <section className="mb-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[22px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_30px_rgba(153,85,255,0.08)]">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#9955ff]/20 text-[#b889ff]">
                <Package size={26} />
              </div>
              <div>
                <p className="text-sm text-[#aaa2cf]">Total Products</p>
                <h3 className="mt-1 text-3xl font-bold">{totalProducts}</h3>
              </div>
            </div>
          </div>

          <div className="rounded-[22px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_30px_rgba(153,85,255,0.08)]">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#9955ff]/20 text-[#b889ff]">
                <Cuboid size={26} />
              </div>
              <div>
                <p className="text-sm text-[#aaa2cf]">AR Enabled</p>
                <h3 className="mt-1 text-3xl font-bold">{arProducts}</h3>
              </div>
            </div>
          </div>

          <div className="rounded-[22px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_30px_rgba(153,85,255,0.08)]">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#9955ff]/20 text-[#b889ff]">
                <Star size={26} />
              </div>
              <div>
                <p className="text-sm text-[#aaa2cf]">Featured</p>
                <h3 className="mt-1 text-3xl font-bold">{featuredProducts}</h3>
              </div>
            </div>
          </div>

          <div className="rounded-[22px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_30px_rgba(153,85,255,0.08)]">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-red-400/15 text-red-300">
                <Box size={26} />
              </div>
              <div>
                <p className="text-sm text-[#aaa2cf]">Low Stock</p>
                <h3 className="mt-1 text-3xl font-bold">{lowStockProducts}</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="mb-6 rounded-[24px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_35px_rgba(153,85,255,0.08)]">
          <div className="grid gap-4 md:grid-cols-[1fr_240px]">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa2cf]"
              />

              <input
                type="text"
                placeholder="Search by product name, brand, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/80 px-4 py-3 pl-11 text-white outline-none transition placeholder:text-[#77708f] focus:border-[#9955ff]/60 focus:shadow-[0_0_25px_rgba(153,85,255,0.22)]"
              />
            </div>

            <div className="relative">
              <Filter
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa2cf]"
              />

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/80 px-4 py-3 pl-11 text-white outline-none transition focus:border-[#9955ff]/60 focus:shadow-[0_0_25px_rgba(153,85,255,0.22)]"
              >
                {categories.map((category) => (
                  <option key={category} value={category} className="bg-[#0f0d1c]">
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>

        {/* Products Table */}
        <section className="rounded-[26px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_40px_rgba(153,85,255,0.1)]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">All Products</h2>
              <p className="mt-1 text-sm text-[#aaa2cf]">
                Showing {filteredProducts.length} of {products.length} products
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[1050px] space-y-3">
              {/* Table Head */}
              <div className="grid grid-cols-[2.4fr_1fr_1fr_1fr_1fr_1fr_1.2fr] gap-4 rounded-2xl bg-[#9955ff]/10 px-4 py-3 text-sm font-bold text-[#aaa2cf]">
                <span>Product</span>
                <span>Category</span>
                <span>Price</span>
                <span>Stock</span>
                <span>AR/3D</span>
                <span>Status</span>
                <span className="text-right">Actions</span>
              </div>

              {/* Table Rows */}
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="grid grid-cols-[2.4fr_1fr_1fr_1fr_1fr_1fr_1.2fr] items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.045] px-4 py-4 text-sm text-[#d7d2eb] transition-all duration-300 hover:border-[#9955ff]/30 hover:bg-[#9955ff]/10 hover:shadow-[0_0_30px_rgba(153,85,255,0.12)]"
                >
                  {/* Product */}
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 overflow-hidden rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="font-bold text-white">{product.name}</h3>
                      <p className="mt-1 text-xs text-[#aaa2cf]">
                        {product.brand}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {product.isNew && (
                          <span className="rounded-full bg-blue-400/15 px-2 py-1 text-[11px] font-bold text-blue-300">
                            New
                          </span>
                        )}

                        {product.featured && (
                          <span className="rounded-full bg-[#9955ff]/20 px-2 py-1 text-[11px] font-bold text-purple-200">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Category */}
                  <span>{product.categoryLabel}</span>

                  {/* Price */}
                  <div>
                    <p className="font-bold text-white">
                      Rs. {product.price.toLocaleString()}
                    </p>
                    <p className="text-xs text-[#77708f] line-through">
                      Rs. {product.originalPrice.toLocaleString()}
                    </p>
                  </div>

                  {/* Stock */}
                  <div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        product.stock <= 8
                          ? "bg-red-400/15 text-red-300"
                          : "bg-emerald-400/15 text-emerald-300"
                      }`}
                    >
                      {product.stock} in stock
                    </span>
                  </div>

                  {/* AR */}
                  <div>
                    {product.arSupported && product.modelUrl ? (
                      <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300">
                        AR Ready
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-400/15 px-3 py-1 text-xs font-bold text-red-300">
                        Missing
                      </span>
                    )}
                  </div>

                  {/* Status */}
                  <div>
                    <p className="flex items-center gap-1 text-sm">
                      <Star size={14} className="text-yellow-300" />
                      {product.rating}
                    </p>
                    <p className="mt-1 text-xs text-[#aaa2cf]">
                      {product.reviewCount} reviews
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2">
                    <a
                      href={`/admin/products/${product.id}`}
                      title="View product"
                      className="grid h-10 w-10 place-items-center rounded-xl border border-[#9955ff]/20 bg-[#9955ff]/10 text-[#c9b6ff] transition hover:bg-[#9955ff]/20 hover:text-white"
                    >
                      <Eye size={17} />
                    </a>

                    <a
                      href={`/admin/products/edit/${product.id}`}
                      title="Edit product"
                      className="grid h-10 w-10 place-items-center rounded-xl border border-[#9955ff]/20 bg-[#9955ff]/10 text-[#c9b6ff] transition hover:bg-[#9955ff]/20 hover:text-white"
                    >
                      <Edit size={17} />
                    </a>

                    <button
                      type="button"
                      title="Delete product"
                      onClick={() =>
                        alert(`Delete functionality later for ${product.name}`)
                      }
                      className="grid h-10 w-10 place-items-center rounded-xl border border-red-400/20 bg-red-400/10 text-red-300 transition hover:bg-red-400/20 hover:text-red-200"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              ))}

              {filteredProducts.length === 0 && (
                <div className="rounded-2xl border border-[#9955ff]/20 bg-white/[0.045] px-4 py-12 text-center">
                  <Package size={48} className="mx-auto mb-3 text-[#9955ff]" />
                  <h3 className="text-lg font-bold">No products found</h3>
                  <p className="mt-2 text-sm text-[#aaa2cf]">
                    Try changing your search or category filter.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminProducts;