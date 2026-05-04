import React, { useState } from "react";
import {
  ArrowLeft,
  Upload,
  Box,
  Image,
  Package,
  DollarSign,
  Layers,
  Hash,
  Sparkles,
  Save,
} from "lucide-react";

const categories = [
  "Furniture",
  "Electronics",
  "Home Decor",
  "Lighting",
  "Office",
  "Fashion",
];

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    shortDescription: "",
    description: "",
    imageUrl: "",
    modelUrl: "",
    arEnabled: true,
    featured: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Later you will send this data to backend/MongoDB API.
    console.log("New Product Data:", formData);

    alert("Product added successfully!");
  };

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

            <p className="mb-1 text-sm text-[#aaa2cf]">
              Product Management
            </p>

            <h1 className="text-3xl font-bold md:text-4xl">
              Add New Product
            </h1>
          </div>

          <div className="rounded-2xl border border-[#9955ff]/25 bg-white/[0.055] px-5 py-4 shadow-[0_0_35px_rgba(153,85,255,0.12)]">
            <p className="text-sm text-[#aaa2cf]">Admin Action</p>
            <p className="mt-1 font-semibold text-[#c9b6ff]">
              Create AR-ready product
            </p>
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="grid gap-7 xl:grid-cols-[2fr_1fr]"
        >
          {/* Left Form Section */}
          <section className="space-y-7">
            {/* Basic Information */}
            <div className="rounded-[26px] border border-[#9955ff]/20 bg-white/[0.055] p-6 shadow-[0_0_40px_rgba(153,85,255,0.1)]">
              <div className="mb-6 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#9955ff]/20 text-[#c9b6ff]">
                  <Package size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold">Basic Information</h2>
                  <p className="text-sm text-[#aaa2cf]">
                    Add main details for this product.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#c9c3df]">
                    Product Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Modern Lounge Chair"
                    className="w-full rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/80 px-4 py-3 text-white outline-none transition placeholder:text-[#77708f] focus:border-[#9955ff]/60 focus:shadow-[0_0_25px_rgba(153,85,255,0.22)]"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#c9c3df]">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/80 px-4 py-3 text-white outline-none transition focus:border-[#9955ff]/60 focus:shadow-[0_0_25px_rgba(153,85,255,0.22)]"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                        className="bg-[#0f0d1c]"
                      >
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#c9c3df]">
                    Price
                  </label>
                  <div className="relative">
                    <DollarSign
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa2cf]"
                    />
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="12000"
                      className="w-full rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/80 px-4 py-3 pl-11 text-white outline-none transition placeholder:text-[#77708f] focus:border-[#9955ff]/60 focus:shadow-[0_0_25px_rgba(153,85,255,0.22)]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#c9c3df]">
                    Stock Quantity
                  </label>
                  <div className="relative">
                    <Hash
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa2cf]"
                    />
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                      placeholder="25"
                      className="w-full rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/80 px-4 py-3 pl-11 text-white outline-none transition placeholder:text-[#77708f] focus:border-[#9955ff]/60 focus:shadow-[0_0_25px_rgba(153,85,255,0.22)]"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="rounded-[26px] border border-[#9955ff]/20 bg-white/[0.055] p-6 shadow-[0_0_40px_rgba(153,85,255,0.1)]">
              <div className="mb-6 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#9955ff]/20 text-[#c9b6ff]">
                  <Layers size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold">Product Description</h2>
                  <p className="text-sm text-[#aaa2cf]">
                    Add short and detailed product information.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#c9c3df]">
                    Short Description
                  </label>
                  <input
                    type="text"
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleChange}
                    placeholder="A stylish modern chair for living rooms."
                    className="w-full rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/80 px-4 py-3 text-white outline-none transition placeholder:text-[#77708f] focus:border-[#9955ff]/60 focus:shadow-[0_0_25px_rgba(153,85,255,0.22)]"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#c9c3df]">
                    Full Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Write complete product details here..."
                    className="w-full resize-none rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/80 px-4 py-3 text-white outline-none transition placeholder:text-[#77708f] focus:border-[#9955ff]/60 focus:shadow-[0_0_25px_rgba(153,85,255,0.22)]"
                  />
                </div>
              </div>
            </div>

            {/* Media & 3D Model */}
            <div className="rounded-[26px] border border-[#9955ff]/20 bg-white/[0.055] p-6 shadow-[0_0_40px_rgba(153,85,255,0.1)]">
              <div className="mb-6 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#9955ff]/20 text-[#c9b6ff]">
                  <Box size={22} />
                </div>

                <div>
                  <h2 className="text-xl font-bold">Media & 3D Model</h2>
                  <p className="text-sm text-[#aaa2cf]">
                    Add product image and GLB/3D model URL.
                  </p>
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-[#c9c3df]">
                    Product Image URL
                  </label>
                  <div className="relative">
                    <Image
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa2cf]"
                    />
                    <input
                      type="text"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleChange}
                      placeholder="https://example.com/product.png"
                      className="w-full rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/80 px-4 py-3 pl-11 text-white outline-none transition placeholder:text-[#77708f] focus:border-[#9955ff]/60 focus:shadow-[0_0_25px_rgba(153,85,255,0.22)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#c9c3df]">
                    3D Model URL / GLB URL
                  </label>
                  <div className="relative">
                    <Upload
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa2cf]"
                    />
                    <input
                      type="text"
                      name="modelUrl"
                      value={formData.modelUrl}
                      onChange={handleChange}
                      placeholder="https://example.com/model.glb"
                      className="w-full rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/80 px-4 py-3 pl-11 text-white outline-none transition placeholder:text-[#77708f] focus:border-[#9955ff]/60 focus:shadow-[0_0_25px_rgba(153,85,255,0.22)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Right Preview/Settings Section */}
          <aside className="space-y-7">
            {/* Preview Card */}
            <div className="sticky top-6 rounded-[26px] border border-[#9955ff]/20 bg-white/[0.055] p-6 shadow-[0_0_40px_rgba(153,85,255,0.12)]">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold">Product Preview</h2>
                <Sparkles size={22} className="text-[#c9b6ff]" />
              </div>

              <div className="mb-5 grid h-56 place-items-center overflow-hidden rounded-[24px] border border-[#9955ff]/25 bg-[#0f0d1c]/80">
                {formData.imageUrl ? (
                  <img
                    src={formData.imageUrl}
                    alt={formData.name || "Product Preview"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <Box
                      size={58}
                      className="mx-auto mb-3 text-[#9955ff]"
                    />
                    <p className="text-sm text-[#aaa2cf]">
                      Product image preview
                    </p>
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm text-[#aaa2cf]">
                  {formData.category || "Category"}
                </p>

                <h3 className="mt-1 text-2xl font-bold">
                  {formData.name || "Product Name"}
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#c9c3df]">
                  {formData.shortDescription ||
                    "Short product description will appear here."}
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-2xl font-bold text-[#c9b6ff]">
                    {formData.price ? `Rs. ${formData.price}` : "Rs. 0"}
                  </span>

                  <span className="rounded-full bg-[#9955ff]/20 px-3 py-1 text-xs font-bold text-purple-200">
                    Stock: {formData.stock || 0}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {formData.arEnabled && (
                    <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300">
                      AR Enabled
                    </span>
                  )}

                  {formData.featured && (
                    <span className="rounded-full bg-[#9955ff]/20 px-3 py-1 text-xs font-bold text-purple-200">
                      Featured
                    </span>
                  )}

                  {formData.modelUrl && (
                    <span className="rounded-full bg-blue-400/15 px-3 py-1 text-xs font-bold text-blue-300">
                      3D Model Added
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Product Settings */}
            <div className="rounded-[26px] border border-[#9955ff]/20 bg-white/[0.055] p-6 shadow-[0_0_40px_rgba(153,85,255,0.1)]">
              <h2 className="mb-5 text-xl font-bold">Product Settings</h2>

              <div className="space-y-5">
                <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/70 px-4 py-4">
                  <div>
                    <p className="font-semibold">Enable AR View</p>
                    <p className="mt-1 text-sm text-[#aaa2cf]">
                      Allow users to preview this product in AR.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    name="arEnabled"
                    checked={formData.arEnabled}
                    onChange={handleChange}
                    className="h-5 w-5 accent-[#9955ff]"
                  />
                </label>

                <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/70 px-4 py-4">
                  <div>
                    <p className="font-semibold">Featured Product</p>
                    <p className="mt-1 text-sm text-[#aaa2cf]">
                      Show this product on homepage highlights.
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="h-5 w-5 accent-[#9955ff]"
                  />
                </label>
              </div>

              <button
                type="submit"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#9955ff] to-[#7c3cff] px-5 py-4 text-sm font-bold text-white shadow-[0_0_35px_rgba(153,85,255,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_55px_rgba(153,85,255,0.55)]"
              >
                <Save size={18} />
                Save Product
              </button>
            </div>
          </aside>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;