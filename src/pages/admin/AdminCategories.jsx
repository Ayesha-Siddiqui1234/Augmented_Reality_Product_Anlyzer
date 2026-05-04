import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  Edit,
  Eye,
  FolderKanban,
  Layers,
  Package,
  Plus,
  Search,
  Trash2,
  Cuboid,
  Star,
} from "lucide-react";
import { products } from "../../data/products";

const AdminCategories = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = useMemo(() => {
    const categoryMap = {};

    products.forEach((product) => {
      if (!categoryMap[product.category]) {
        categoryMap[product.category] = {
          id: product.category,
          name: product.categoryLabel,
          slug: product.category,
          totalProducts: 0,
          arProducts: 0,
          featuredProducts: 0,
          totalStock: 0,
          products: [],
        };
      }

      categoryMap[product.category].totalProducts += 1;
      categoryMap[product.category].totalStock += product.stock;
      categoryMap[product.category].products.push(product);

      if (product.arSupported && product.modelUrl) {
        categoryMap[product.category].arProducts += 1;
      }

      if (product.featured) {
        categoryMap[product.category].featuredProducts += 1;
      }
    });

    return Object.values(categoryMap);
  }, []);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      return (
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.slug.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [categories, searchTerm]);

  const totalCategories = categories.length;
  const totalProducts = products.length;
  const totalArProducts = products.filter(
    (product) => product.arSupported && product.modelUrl
  ).length;
  const totalFeaturedProducts = products.filter(
    (product) => product.featured
  ).length;

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

            <p className="mb-1 text-sm text-[#aaa2cf]">Category Management</p>

            <h1 className="text-3xl font-bold md:text-4xl">
              Admin Categories
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#c9c3df]">
              Manage product categories and track how many products, AR models,
              and featured items belong to each category.
            </p>
          </div>

        <a
  href="/admin/categories/add"
  className="flex w-fit items-center gap-2 rounded-2xl bg-gradient-to-r from-[#9955ff] to-[#7c3cff] px-5 py-3 text-sm font-bold text-white shadow-[0_0_35px_rgba(153,85,255,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_55px_rgba(153,85,255,0.55)]"
>
  <Plus size={18} />
  Add Category
</a>
        </header>

        {/* Summary Cards */}
        <section className="mb-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[22px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_30px_rgba(153,85,255,0.08)]">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#9955ff]/20 text-[#b889ff]">
                <FolderKanban size={26} />
              </div>
              <div>
                <p className="text-sm text-[#aaa2cf]">Total Categories</p>
                <h3 className="mt-1 text-3xl font-bold">{totalCategories}</h3>
              </div>
            </div>
          </div>

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
                <p className="text-sm text-[#aaa2cf]">AR Products</p>
                <h3 className="mt-1 text-3xl font-bold">{totalArProducts}</h3>
              </div>
            </div>
          </div>

          <div className="rounded-[22px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_30px_rgba(153,85,255,0.08)]">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#9955ff]/20 text-[#b889ff]">
                <Star size={26} />
              </div>
              <div>
                <p className="text-sm text-[#aaa2cf]">Featured Products</p>
                <h3 className="mt-1 text-3xl font-bold">
                  {totalFeaturedProducts}
                </h3>
              </div>
            </div>
          </div>
        </section>

        {/* Search */}
        <section className="mb-6 rounded-[24px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_35px_rgba(153,85,255,0.08)]">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa2cf]"
            />

            <input
              type="text"
              placeholder="Search category by name or slug..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/80 px-4 py-3 pl-11 text-white outline-none transition placeholder:text-[#77708f] focus:border-[#9955ff]/60 focus:shadow-[0_0_25px_rgba(153,85,255,0.22)]"
            />
          </div>
        </section>

        {/* Categories Table */}
        <section className="rounded-[26px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_40px_rgba(153,85,255,0.1)]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">All Categories</h2>
              <p className="mt-1 text-sm text-[#aaa2cf]">
                Showing {filteredCategories.length} of {categories.length}{" "}
                categories
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[950px] space-y-3">
              {/* Table Head */}
              <div className="grid grid-cols-[2fr_1.3fr_1fr_1fr_1fr_1fr_1.2fr] gap-4 rounded-2xl bg-[#9955ff]/10 px-4 py-3 text-sm font-bold text-[#aaa2cf]">
                <span>Category</span>
                <span>Slug</span>
                <span>Products</span>
                <span>AR Ready</span>
                <span>Featured</span>
                <span>Stock</span>
                <span className="text-right">Actions</span>
              </div>

              {/* Table Rows */}
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  className="grid grid-cols-[2fr_1.3fr_1fr_1fr_1fr_1fr_1.2fr] items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.045] px-4 py-4 text-sm text-[#d7d2eb] transition-all duration-300 hover:border-[#9955ff]/30 hover:bg-[#9955ff]/10 hover:shadow-[0_0_30px_rgba(153,85,255,0.12)]"
                >
                  {/* Category */}
                  <div className="flex items-center gap-4">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl border border-[#9955ff]/20 bg-[#9955ff]/10 text-[#c9b6ff]">
                      <Layers size={24} />
                    </div>

                    <div>
                      <h3 className="font-bold text-white">{category.name}</h3>
                      <p className="mt-1 text-xs text-[#aaa2cf]">
                        {category.totalProducts} product
                        {category.totalProducts > 1 ? "s" : ""} inside
                      </p>
                    </div>
                  </div>

                  {/* Slug */}
                  <span className="rounded-full bg-[#0f0d1c]/80 px-3 py-1 text-xs font-semibold text-[#c9b6ff]">
                    {category.slug}
                  </span>

                  {/* Products */}
                  <span className="font-bold text-white">
                    {category.totalProducts}
                  </span>

                  {/* AR Ready */}
                  <span className="w-fit rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300">
                    {category.arProducts}
                  </span>

                  {/* Featured */}
                  <span className="w-fit rounded-full bg-[#9955ff]/20 px-3 py-1 text-xs font-bold text-purple-200">
                    {category.featuredProducts}
                  </span>

                  {/* Stock */}
                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
                      category.totalStock <= 10
                        ? "bg-red-400/15 text-red-300"
                        : "bg-blue-400/15 text-blue-300"
                    }`}
                  >
                    {category.totalStock}
                  </span>

                  {/* Actions */}
                  <div className="flex justify-end gap-2">
                   

                    <a href={`/admin/categories/edit/${category.slug}`}
                      title="Edit category"
  className="grid h-10 w-10 place-items-center rounded-xl border border-[#9955ff]/20 bg-[#9955ff]/10 text-[#c9b6ff] transition hover:bg-[#9955ff]/20 hover:text-white"
>
                    <Edit size={17} />
                    </a>

                    <button
                      type="button"
                      title="Delete category"
                      onClick={() =>
                        alert(`Delete functionality later for ${category.name}`)
                      }
                      className="grid h-10 w-10 place-items-center rounded-xl border border-red-400/20 bg-red-400/10 text-red-300 transition hover:bg-red-400/20 hover:text-red-200"
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </div>
              ))}

              {filteredCategories.length === 0 && (
                <div className="rounded-2xl border border-[#9955ff]/20 bg-white/[0.045] px-4 py-12 text-center">
                  <FolderKanban
                    size={48}
                    className="mx-auto mb-3 text-[#9955ff]"
                  />
                  <h3 className="text-lg font-bold">No categories found</h3>
                  <p className="mt-2 text-sm text-[#aaa2cf]">
                    Try searching with another category name.
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

export default AdminCategories;