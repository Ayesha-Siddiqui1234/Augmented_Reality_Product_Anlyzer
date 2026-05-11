import React, { useMemo, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import {
  ArrowLeft,
  Box,
  Edit,
  Save,
  Eye,
  Package,
  Star,
  Tags,
  Ruler,
  Palette,
  Cuboid,
  BadgeCheck,
} from "lucide-react";
import { products } from "../../data/products";

const AdminProductDetails = () => {
  const { id } = useParams();
  const location = useLocation();

  const isEditMode = location.pathname.includes("/edit/");

  const product = useMemo(() => {
    return products.find((item) => item.id === id);
  }, [id]);

  const [formData, setFormData] = useState(() => ({
    name: product?.name || "",
    brand: product?.brand || "",
    categoryLabel: product?.categoryLabel || "",
    price: product?.price || "",
    originalPrice: product?.originalPrice || "",
    stock: product?.stock || "",
    shortDescription: product?.shortDescription || "",
    description: product?.description || "",
    imageUrl: product?.imageUrl || "",
    modelUrl: product?.modelUrl || "",
    material: product?.material || "",
    arSupported: product?.arSupported || false,
    featured: product?.featured || false,
    isNew: product?.isNew || false,
    colors: product?.colors?.join(", ") || "",
    tags: product?.tags?.join(", ") || "",
    width: product?.dimensions?.width || "",
    height: product?.dimensions?.height || "",
    depth: product?.dimensions?.depth || "",
  }));

  if (!product) {
    return (
      <div className="min-h-screen bg-[#090812] px-5 py-8 text-white">
        <div className="rounded-[26px] border border-red-400/20 bg-red-400/10 p-8 text-center">
          <Package size={50} className="mx-auto mb-4 text-red-300" />
          <h1 className="text-2xl font-bold">Product not found</h1>
          <a
            href="/admin/products"
            className="mt-5 inline-flex rounded-2xl bg-[#9955ff] px-5 py-3 text-sm font-bold"
          >
            Back to Products
          </a>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    console.log("Updated Product:", formData);

    toast.info("Edit save functionality will connect to backend later.");
  };

  const inputClass =
    "w-full rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/80 px-4 py-3 text-white outline-none transition placeholder:text-[#77708f] focus:border-[#9955ff]/60 focus:shadow-[0_0_25px_rgba(153,85,255,0.22)] disabled:cursor-not-allowed disabled:opacity-70";

  const labelClass = "mb-2 block text-sm font-medium text-[#c9c3df]";

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="min-h-screen bg-[#090812] text-white">
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(153,85,255,0.28),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(153,85,255,0.18),transparent_35%)] px-5 py-6 md:px-8 lg:px-10">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <a
              href="/admin/products"
              className="mb-4 flex w-fit items-center gap-2 text-sm text-[#c9b6ff] transition hover:text-white"
            >
              <ArrowLeft size={17} />
              Back to Products
            </a>

            <p className="mb-1 flex items-center gap-2 text-sm text-[#aaa2cf]">
              {isEditMode ? <Edit size={16} /> : <Eye size={16} />}
              {isEditMode ? "Edit Product" : "View Product"}
            </p>

            <h1 className="text-3xl font-bold md:text-4xl">
              {formData.name}
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#c9c3df]">
              {isEditMode
                ? "Update existing product information, stock, price, AR model, and display settings."
                : "Admin-only detailed product view with inventory, pricing, AR status, and product metadata."}
            </p>
          </div>

          {!isEditMode ? (
            <a
              href={`/admin/products/edit/${product.id}`}
              className="flex w-fit items-center gap-2 rounded-2xl bg-gradient-to-r from-[#9955ff] to-[#7c3cff] px-5 py-3 text-sm font-bold text-white shadow-[0_0_35px_rgba(153,85,255,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_55px_rgba(153,85,255,0.55)]"
            >
              <Edit size={18} />
              Edit Product
            </a>
          ) : (
            <a
              href={`/admin/products/${product.id}`}
              className="flex w-fit items-center gap-2 rounded-2xl border border-[#9955ff]/30 bg-white/[0.055] px-5 py-3 text-sm font-bold text-[#c9b6ff] transition hover:bg-[#9955ff]/15 hover:text-white"
            >
              <Eye size={18} />
              View Mode
            </a>
          )}
        </header>

        <form onSubmit={handleSave} className="grid gap-7 xl:grid-cols-[1.35fr_2fr]">
          {/* Left Preview Card */}
          <aside className="space-y-7">
            <div className="sticky top-6 rounded-[28px] border border-[#9955ff]/20 bg-white/[0.055] p-6 shadow-[0_0_45px_rgba(153,85,255,0.14)]">
              <div className="mb-5 overflow-hidden rounded-[26px] border border-[#9955ff]/25 bg-[#0f0d1c]/80">
                <img
                  src={formData.imageUrl}
                  alt={formData.name}
                  className="h-80 w-full object-cover"
                />
              </div>

              <div className="mb-4 flex flex-wrap gap-2">
                {formData.isNew && (
                  <span className="rounded-full bg-blue-400/15 px-3 py-1 text-xs font-bold text-blue-300">
                    New
                  </span>
                )}

                {formData.featured && (
                  <span className="rounded-full bg-[#9955ff]/20 px-3 py-1 text-xs font-bold text-purple-200">
                    Featured
                  </span>
                )}

                {formData.arSupported && (
                  <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300">
                    AR Ready
                  </span>
                )}
              </div>

              <p className="text-sm text-[#aaa2cf]">{formData.categoryLabel}</p>

              <h2 className="mt-1 text-2xl font-bold">{formData.name}</h2>

              <p className="mt-3 text-sm leading-6 text-[#c9c3df]">
                {formData.shortDescription}
              </p>

              <div className="mt-5 flex items-end justify-between">
                <div>
                  <p className="text-3xl font-bold text-[#c9b6ff]">
                    Rs. {Number(formData.price).toLocaleString()}
                  </p>

                  <p className="mt-1 text-sm text-[#77708f] line-through">
                    Rs. {Number(formData.originalPrice).toLocaleString()}
                  </p>
                </div>

                <div className="rounded-2xl border border-[#9955ff]/20 bg-[#9955ff]/10 px-4 py-3 text-right">
                  <p className="text-xs text-[#aaa2cf]">Stock</p>
                  <p className="text-lg font-bold">{formData.stock}</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/[0.045] p-4">
                  <p className="flex items-center gap-2 text-sm text-[#aaa2cf]">
                    <Star size={15} className="text-yellow-300" />
                    Rating
                  </p>
                  <p className="mt-1 font-bold">{product.rating}</p>
                </div>

                <div className="rounded-2xl bg-white/[0.045] p-4">
                  <p className="text-sm text-[#aaa2cf]">Reviews</p>
                  <p className="mt-1 font-bold">{product.reviewCount}</p>
                </div>
              </div>
            </div>
          </aside>

          {/* Right Details/Edit Form */}
          <section className="space-y-7">
            {/* Basic Info */}
            <div className="rounded-[26px] border border-[#9955ff]/20 bg-white/[0.055] p-6 shadow-[0_0_40px_rgba(153,85,255,0.1)]">
              <div className="mb-6 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#9955ff]/20 text-[#c9b6ff]">
                  <Package size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold">Basic Information</h2>
                  <p className="text-sm text-[#aaa2cf]">
                    Product identity, category, brand, price, and stock.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className={labelClass}>Product Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Brand</label>
                  <input
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Category</label>
                  <input
                    name="categoryLabel"
                    value={formData.categoryLabel}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Material</label>
                  <input
                    name="material"
                    value={formData.material}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Price</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Original Price</label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Image URL</label>
                  <input
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {/* Descriptions */}
            <div className="rounded-[26px] border border-[#9955ff]/20 bg-white/[0.055] p-6 shadow-[0_0_40px_rgba(153,85,255,0.1)]">
              <div className="mb-6 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#9955ff]/20 text-[#c9b6ff]">
                  <BadgeCheck size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold">Product Description</h2>
                  <p className="text-sm text-[#aaa2cf]">
                    Short and full product descriptions.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Short Description</label>
                  <input
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Full Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    rows="5"
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>
            </div>

            {/* AR / Model */}
            <div className="rounded-[26px] border border-[#9955ff]/20 bg-white/[0.055] p-6 shadow-[0_0_40px_rgba(153,85,255,0.1)]">
              <div className="mb-6 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#9955ff]/20 text-[#c9b6ff]">
                  <Cuboid size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold">3D / AR Information</h2>
                  <p className="text-sm text-[#aaa2cf]">
                    Model URL and AR availability for product visualization.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className={labelClass}>3D Model URL / GLB URL</label>
                  <input
                    name="modelUrl"
                    value={formData.modelUrl}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className={inputClass}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/70 px-4 py-4">
                    <div>
                      <p className="font-semibold">AR Supported</p>
                    </div>
                    <input
                      type="checkbox"
                      name="arSupported"
                      checked={formData.arSupported}
                      onChange={handleChange}
                      disabled={!isEditMode}
                      className="h-5 w-5 accent-[#9955ff] disabled:cursor-not-allowed"
                    />
                  </label>

                  <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/70 px-4 py-4">
                    <div>
                      <p className="font-semibold">Featured</p>
                    </div>
                    <input
                      type="checkbox"
                      name="featured"
                      checked={formData.featured}
                      onChange={handleChange}
                      disabled={!isEditMode}
                      className="h-5 w-5 accent-[#9955ff] disabled:cursor-not-allowed"
                    />
                  </label>

                  <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/70 px-4 py-4">
                    <div>
                      <p className="font-semibold">New Product</p>
                    </div>
                    <input
                      type="checkbox"
                      name="isNew"
                      checked={formData.isNew}
                      onChange={handleChange}
                      disabled={!isEditMode}
                      className="h-5 w-5 accent-[#9955ff] disabled:cursor-not-allowed"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Extra Details */}
            <div className="rounded-[26px] border border-[#9955ff]/20 bg-white/[0.055] p-6 shadow-[0_0_40px_rgba(153,85,255,0.1)]">
              <div className="mb-6 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#9955ff]/20 text-[#c9b6ff]">
                  <Tags size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold">Extra Details</h2>
                  <p className="text-sm text-[#aaa2cf]">
                    Colors, tags, and product dimensions.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className={labelClass}>
                    <span className="inline-flex items-center gap-2">
                      <Palette size={15} />
                      Colors
                    </span>
                  </label>
                  <input
                    name="colors"
                    value={formData.colors}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Tags</label>
                  <input
                    name="tags"
                    value={formData.tags}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>
                    <span className="inline-flex items-center gap-2">
                      <Ruler size={15} />
                      Width
                    </span>
                  </label>
                  <input
                    name="width"
                    value={formData.width}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Height</label>
                  <input
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Depth</label>
                  <input
                    name="depth"
                    value={formData.depth}
                    onChange={handleChange}
                    disabled={!isEditMode}
                    className={inputClass}
                  />
                </div>
              </div>
            </div>

            {isEditMode && (
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-[#9955ff] to-[#7c3cff] px-6 py-4 text-sm font-bold text-white shadow-[0_0_35px_rgba(153,85,255,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_55px_rgba(153,85,255,0.55)]"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </div>
            )}
          </section>
        </form>
      </div>
    </div>
    </>
  );
};

export default AdminProductDetails;