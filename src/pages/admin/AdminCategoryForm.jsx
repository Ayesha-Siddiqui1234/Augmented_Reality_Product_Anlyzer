import React, { useMemo, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  FolderKanban,
  Save,
  Plus,
  Edit,
  Package,
  Cuboid,
  Star,
  Tag,
  FileText,
} from "lucide-react";
import { products } from "../../data/products";

const AdminCategoryForm = () => {
  const { id } = useParams();
  const location = useLocation();

  const isEditMode = location.pathname.includes("/edit/");

  const existingCategory = useMemo(() => {
    const categoryProducts = products.filter((product) => product.category === id);

    if (categoryProducts.length === 0) return null;

    const firstProduct = categoryProducts[0];

    return {
      id: firstProduct.category,
      name: firstProduct.categoryLabel,
      slug: firstProduct.category,
      description: `${firstProduct.categoryLabel} products for AR-based shopping experience.`,
      totalProducts: categoryProducts.length,
      arProducts: categoryProducts.filter(
        (product) => product.arSupported && product.modelUrl
      ).length,
      featuredProducts: categoryProducts.filter((product) => product.featured)
        .length,
      totalStock: categoryProducts.reduce(
        (total, product) => total + product.stock,
        0
      ),
    };
  }, [id]);

  const [formData, setFormData] = useState(() => ({
    name: existingCategory?.name || "",
    slug: existingCategory?.slug || "",
    description: existingCategory?.description || "",
    status: "Active",
    showOnHome: false,
    featuredCategory: false,
  }));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const createSlug = (value) => {
    return value
      .toLowerCase()
      .trim()
      .replaceAll(" ", "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const handleNameChange = (e) => {
    const value = e.target.value;

    setFormData((prev) => ({
      ...prev,
      name: value,
      slug: isEditMode ? prev.slug : createSlug(value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(isEditMode ? "Updated Category:" : "New Category:", formData);

    alert(
      isEditMode
        ? "Category update functionality will connect to backend later."
        : "Category add functionality will connect to backend later."
    );
  };

  const inputClass =
    "w-full rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/80 px-4 py-3 text-white outline-none transition placeholder:text-[#77708f] focus:border-[#9955ff]/60 focus:shadow-[0_0_25px_rgba(153,85,255,0.22)]";

  const labelClass = "mb-2 block text-sm font-medium text-[#c9c3df]";

  if (isEditMode && !existingCategory) {
    return (
      <div className="min-h-screen bg-[#090812] px-5 py-8 text-white">
        <div className="rounded-[26px] border border-red-400/20 bg-red-400/10 p-8 text-center">
          <FolderKanban size={50} className="mx-auto mb-4 text-red-300" />
          <h1 className="text-2xl font-bold">Category not found</h1>

          <a
            href="/admin/categories"
            className="mt-5 inline-flex rounded-2xl bg-[#9955ff] px-5 py-3 text-sm font-bold"
          >
            Back to Categories
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090812] text-white">
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(153,85,255,0.28),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(153,85,255,0.18),transparent_35%)] px-5 py-6 md:px-8 lg:px-10">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <a
              href="/admin/categories"
              className="mb-4 flex w-fit items-center gap-2 text-sm text-[#c9b6ff] transition hover:text-white"
            >
              <ArrowLeft size={17} />
              Back to Categories
            </a>

            <p className="mb-1 flex items-center gap-2 text-sm text-[#aaa2cf]">
              {isEditMode ? <Edit size={16} /> : <Plus size={16} />}
              {isEditMode ? "Edit Category" : "Add Category"}
            </p>

            <h1 className="text-3xl font-bold md:text-4xl">
              {isEditMode ? "Edit Category" : "Add New Category"}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#c9c3df]">
              {isEditMode
                ? "Update category name, slug, status, and display settings."
                : "Create a new category that can be used while adding products."}
            </p>
          </div>

          <div className="rounded-2xl border border-[#9955ff]/25 bg-white/[0.055] px-5 py-4 shadow-[0_0_35px_rgba(153,85,255,0.12)]">
            <p className="text-sm text-[#aaa2cf]">Mode</p>
            <p className="mt-1 font-semibold text-[#c9b6ff]">
              {isEditMode ? "Editing Existing Category" : "Creating Category"}
            </p>
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="grid gap-7 xl:grid-cols-[2fr_1fr]"
        >
          {/* Left Form */}
          <section className="space-y-7">
            <div className="rounded-[26px] border border-[#9955ff]/20 bg-white/[0.055] p-6 shadow-[0_0_40px_rgba(153,85,255,0.1)]">
              <div className="mb-6 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#9955ff]/20 text-[#c9b6ff]">
                  <FolderKanban size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold">Category Information</h2>
                  <p className="text-sm text-[#aaa2cf]">
                    Main details used for product grouping.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Category Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleNameChange}
                    placeholder="Furniture"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Category Slug</label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="furniture"
                    className={inputClass}
                    required
                  />
                  <p className="mt-2 text-xs text-[#aaa2cf]">
                    Used in URLs and product filtering.
                  </p>
                </div>

                <div>
                  <label className={labelClass}>Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="Active" className="bg-[#0f0d1c]">
                      Active
                    </option>
                    <option value="Inactive" className="bg-[#0f0d1c]">
                      Inactive
                    </option>
                  </select>
                </div>

                <div>
                  <label className={labelClass}>Category Type</label>
                  <input
                    type="text"
                    value="Product Category"
                    disabled
                    className={`${inputClass} cursor-not-allowed opacity-70`}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-[26px] border border-[#9955ff]/20 bg-white/[0.055] p-6 shadow-[0_0_40px_rgba(153,85,255,0.1)]">
              <div className="mb-6 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#9955ff]/20 text-[#c9b6ff]">
                  <FileText size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold">Category Description</h2>
                  <p className="text-sm text-[#aaa2cf]">
                    Short explanation of what this category contains.
                  </p>
                </div>
              </div>

              <div>
                <label className={labelClass}>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="6"
                  placeholder="Write category description here..."
                  className={`${inputClass} resize-none`}
                />
              </div>
            </div>

            <div className="rounded-[26px] border border-[#9955ff]/20 bg-white/[0.055] p-6 shadow-[0_0_40px_rgba(153,85,255,0.1)]">
              <div className="mb-6 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#9955ff]/20 text-[#c9b6ff]">
                  <Tag size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold">Display Settings</h2>
                  <p className="text-sm text-[#aaa2cf]">
                    Control how this category appears on the user side.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/70 px-4 py-4">
                  <div>
                    <p className="font-semibold">Show on Homepage</p>
                    <p className="mt-1 text-sm text-[#aaa2cf]">
                      Display this category in homepage sections.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    name="showOnHome"
                    checked={formData.showOnHome}
                    onChange={handleChange}
                    className="h-5 w-5 accent-[#9955ff]"
                  />
                </label>

                <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/70 px-4 py-4">
                  <div>
                    <p className="font-semibold">Featured Category</p>
                    <p className="mt-1 text-sm text-[#aaa2cf]">
                      Highlight this category for users.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    name="featuredCategory"
                    checked={formData.featuredCategory}
                    onChange={handleChange}
                    className="h-5 w-5 accent-[#9955ff]"
                  />
                </label>
              </div>
            </div>
          </section>

          {/* Right Preview */}
          <aside className="space-y-7">
            <div className="sticky top-6 rounded-[26px] border border-[#9955ff]/20 bg-white/[0.055] p-6 shadow-[0_0_40px_rgba(153,85,255,0.12)]">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold">Category Preview</h2>
                <FolderKanban size={22} className="text-[#c9b6ff]" />
              </div>

              <div className="mb-5 grid h-44 place-items-center rounded-[24px] border border-[#9955ff]/25 bg-[#0f0d1c]/80">
                <div className="grid h-24 w-24 place-items-center rounded-full border border-[#9955ff]/40 bg-[#9955ff]/20 text-[#c9b6ff] shadow-[0_0_80px_rgba(153,85,255,0.35)]">
                  <FolderKanban size={44} />
                </div>
              </div>

              <p className="text-sm text-[#aaa2cf]">
                {formData.slug || "category-slug"}
              </p>

              <h3 className="mt-1 text-2xl font-bold">
                {formData.name || "Category Name"}
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#c9c3df]">
                {formData.description ||
                  "Category description will appear here."}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    formData.status === "Active"
                      ? "bg-emerald-400/15 text-emerald-300"
                      : "bg-red-400/15 text-red-300"
                  }`}
                >
                  {formData.status}
                </span>

                {formData.showOnHome && (
                  <span className="rounded-full bg-blue-400/15 px-3 py-1 text-xs font-bold text-blue-300">
                    Homepage
                  </span>
                )}

                {formData.featuredCategory && (
                  <span className="rounded-full bg-[#9955ff]/20 px-3 py-1 text-xs font-bold text-purple-200">
                    Featured
                  </span>
                )}
              </div>

              {isEditMode && existingCategory && (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl bg-white/[0.045] p-4">
                    <p className="flex items-center gap-2 text-sm text-[#aaa2cf]">
                      <Package size={15} />
                      Products
                    </p>
                    <p className="mt-1 text-xl font-bold">
                      {existingCategory.totalProducts}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/[0.045] p-4">
                    <p className="flex items-center gap-2 text-sm text-[#aaa2cf]">
                      <Cuboid size={15} />
                      AR Ready
                    </p>
                    <p className="mt-1 text-xl font-bold">
                      {existingCategory.arProducts}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/[0.045] p-4">
                    <p className="flex items-center gap-2 text-sm text-[#aaa2cf]">
                      <Star size={15} />
                      Featured
                    </p>
                    <p className="mt-1 text-xl font-bold">
                      {existingCategory.featuredProducts}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-white/[0.045] p-4">
                    <p className="text-sm text-[#aaa2cf]">Total Stock</p>
                    <p className="mt-1 text-xl font-bold">
                      {existingCategory.totalStock}
                    </p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#9955ff] to-[#7c3cff] px-5 py-4 text-sm font-bold text-white shadow-[0_0_35px_rgba(153,85,255,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_55px_rgba(153,85,255,0.55)]"
              >
                <Save size={18} />
                {isEditMode ? "Save Category Changes" : "Create Category"}
              </button>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
};

export default AdminCategoryForm;