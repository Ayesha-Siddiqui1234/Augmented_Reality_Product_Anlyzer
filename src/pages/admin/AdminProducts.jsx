// src/pages/admin/AdminProducts.jsx

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchAdminProducts,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
  selectAdminProducts,
  selectAdminProductsLoading,
  selectAdminProductsError,
  selectAdminProductsSuccess,
  selectAdminProductsPagination,
  clearError,
  clearSuccessMessage,
} from "../../features/admin/adminProductSlice";

import { selectCurrentUser } from "../../features/auth/authSlice";

const categories = [
  "Furniture",
  "Electronics",
  "Home Decor",
  "Lighting",
  "Office",
  "Fashion",
];

const AdminProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);
  const products = useSelector(selectAdminProducts);
  const loading = useSelector(selectAdminProductsLoading);
  const error = useSelector(selectAdminProductsError);
  const successMessage = useSelector(selectAdminProductsSuccess);
  const pagination = useSelector(selectAdminProductsPagination);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  const [editFormData, setEditFormData] = useState({
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
    brand: "",
    isActive: true,
  });

  useEffect(() => {
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/admin/login");
    }
  }, [currentUser, navigate]);

  // Debounce search so API is not called on every key press
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch products
  useEffect(() => {
    dispatch(
      fetchAdminProducts({
        page: currentPage,
        limit: 10,
        search: debouncedSearchTerm,
        category: selectedCategory,
      })
    );
  }, [dispatch, currentPage, debouncedSearchTerm, selectedCategory]);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        dispatch(clearSuccessMessage());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [successMessage, dispatch]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dispatch(clearError());
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  const openEditModal = (product) => {
    setEditingProductId(product._id);

    setEditFormData({
      name: product.name || "",
      category: product.category || "",
      price: product.price || "",
      stock: product.stock || "",
      shortDescription: product.shortDescription || "",
      description: product.description || "",
      imageUrl: product.imageUrl || product.images?.[0] || "",
      modelUrl: product.modelUrl || product.glbModel || "",
      arEnabled: product.arEnabled ?? product.arSupported ?? true,
      featured: product.featured ?? false,
      brand: product.brand || "",
      isActive: product.isActive ?? true,
    });

    setIsEditOpen(true);
  };

  const closeEditModal = () => {
    setIsEditOpen(false);
    setEditingProductId(null);

    setEditFormData({
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
      brand: "",
      isActive: true,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;

    setEditFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();

    if (!editingProductId) return;

    const productData = {
      name: editFormData.name,
      category: editFormData.category,
      price: Number(editFormData.price),
      stock: Number(editFormData.stock),
      shortDescription: editFormData.shortDescription,
      description: editFormData.description,
      imageUrl: editFormData.imageUrl,
      modelUrl: editFormData.modelUrl,
      arEnabled: editFormData.arEnabled,
      featured: editFormData.featured,
      brand: editFormData.brand,
      isActive: editFormData.isActive,
    };

    const result = await dispatch(
      updateProduct({
        productId: editingProductId,
        productData,
      })
    );

    if (updateProduct.fulfilled.match(result)) {
      closeEditModal();
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await dispatch(deleteProduct(productId));

      dispatch(
        fetchAdminProducts({
          page: currentPage,
          limit: 10,
          search: debouncedSearchTerm,
          category: selectedCategory,
        })
      );
    }
  };

  const handleToggleStatus = async (productId) => {
    await dispatch(toggleProductStatus(productId));
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen bg-[#090812] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090812] text-white">
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(153,85,255,0.28),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(153,85,255,0.18),transparent_35%)] px-5 py-6 md:px-8 lg:px-10">
        {successMessage && (
          <div className="mb-4 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400">
            ✅ {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
            ❌ {error}
          </div>
        )}

        <header className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <button
              onClick={() => navigate("/admin")}
              className="mb-3 flex items-center gap-2 text-purple-400 hover:text-purple-300 transition"
            >
              ← Back to Dashboard
            </button>

            <h1 className="text-3xl font-bold text-purple-400">
              Products Management
            </h1>

            <p className="text-gray-400 mt-2">
              Total: {pagination.totalProducts} products
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/products/add")}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-semibold transition flex items-center gap-2"
          >
            <span>+</span> Add New Product
          </button>
        </header>

        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full px-4 py-3 bg-white/5 border border-purple-400/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-400"
            />

            {loading && products.length > 0 && (
              <p className="mt-2 text-sm text-purple-300">
                Updating results...
              </p>
            )}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-purple-400/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-purple-500/20 border-b border-purple-400/20">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-400">
                    Image
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-400">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-400">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-400">
                    Price
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-400">
                    Stock
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-400">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-purple-400">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-purple-400/10">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-white/5 transition">
                    <td className="px-6 py-4">
                      <img
                        src={product.images?.[0] || "/placeholder.png"}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>

                    <td className="px-6 py-4">
                      <div className="font-medium text-white">
                        {product.name}
                      </div>
                      <div className="text-sm text-gray-400">
                        {product.brand}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-gray-300">
                      {product.category}
                    </td>

                    <td className="px-6 py-4 text-white font-semibold">
                      PKR {Number(product.price || 0).toLocaleString()}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          product.stock > 10
                            ? "bg-green-500/20 text-green-400"
                            : product.stock > 0
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {product.stock}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleToggleStatus(product._id)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          product.isActive
                            ? "bg-green-500/20 text-green-400"
                            : "bg-gray-500/20 text-gray-400"
                        }`}
                      >
                        {product.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition"
                          title="Edit"
                        >
                          ✏️
                        </button>

                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pagination.totalPages > 1 && (
            <div className="px-6 py-4 border-t border-purple-400/20 flex items-center justify-between">
              <div className="text-sm text-gray-400">
                Page {pagination.currentPage} of {pagination.totalPages}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(1, prev - 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(pagination.totalPages, prev + 1)
                    )
                  }
                  disabled={currentPage === pagination.totalPages}
                  className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>

        {products.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>

            <h3 className="text-xl font-semibold text-purple-400 mb-2">
              No products found
            </h3>

            <p className="text-gray-400 mb-6">
              Start by adding your first product
            </p>

            <button
              onClick={() => navigate("/admin/products/add")}
              className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg font-semibold transition"
            >
              Add Product
            </button>
          </div>
        )}

        {isEditOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
            <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl border border-purple-400/30 bg-[#0f0d1c] p-6 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-purple-400">
                    Edit Product
                  </h2>
                  <p className="text-sm text-gray-400">
                    Update product details and save changes to MongoDB.
                  </p>
                </div>

                <button
                  onClick={closeEditModal}
                  className="rounded-lg bg-white/10 px-3 py-2 text-white hover:bg-white/20"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleUpdateProduct} className="grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={handleEditChange}
                      className="w-full rounded-lg border border-purple-400/20 bg-white/5 px-4 py-3 text-white outline-none focus:border-purple-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Category
                    </label>
                    <select
                      name="category"
                      value={editFormData.category}
                      onChange={handleEditChange}
                      className="w-full rounded-lg border border-purple-400/20 bg-[#0f0d1c] px-4 py-3 text-white outline-none focus:border-purple-400"
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={editFormData.price}
                      onChange={handleEditChange}
                      min="0"
                      className="w-full rounded-lg border border-purple-400/20 bg-white/5 px-4 py-3 text-white outline-none focus:border-purple-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Stock
                    </label>
                    <input
                      type="number"
                      name="stock"
                      value={editFormData.stock}
                      onChange={handleEditChange}
                      min="0"
                      className="w-full rounded-lg border border-purple-400/20 bg-white/5 px-4 py-3 text-white outline-none focus:border-purple-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Brand
                    </label>
                    <input
                      type="text"
                      name="brand"
                      value={editFormData.brand}
                      onChange={handleEditChange}
                      className="w-full rounded-lg border border-purple-400/20 bg-white/5 px-4 py-3 text-white outline-none focus:border-purple-400"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Image URL
                    </label>
                    <input
                      type="text"
                      name="imageUrl"
                      value={editFormData.imageUrl}
                      onChange={handleEditChange}
                      className="w-full rounded-lg border border-purple-400/20 bg-white/5 px-4 py-3 text-white outline-none focus:border-purple-400"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm text-gray-300">
                      3D Model / GLB URL
                    </label>
                    <input
                      type="text"
                      name="modelUrl"
                      value={editFormData.modelUrl}
                      onChange={handleEditChange}
                      className="w-full rounded-lg border border-purple-400/20 bg-white/5 px-4 py-3 text-white outline-none focus:border-purple-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Short Description
                  </label>
                  <input
                    type="text"
                    name="shortDescription"
                    value={editFormData.shortDescription}
                    onChange={handleEditChange}
                    className="w-full rounded-lg border border-purple-400/20 bg-white/5 px-4 py-3 text-white outline-none focus:border-purple-400"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Full Description
                  </label>
                  <textarea
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditChange}
                    rows="5"
                    className="w-full resize-none rounded-lg border border-purple-400/20 bg-white/5 px-4 py-3 text-white outline-none focus:border-purple-400"
                    required
                  />
                </div>

                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2 rounded-lg border border-purple-400/20 bg-white/5 px-4 py-3">
                    <input
                      type="checkbox"
                      name="arEnabled"
                      checked={editFormData.arEnabled}
                      onChange={handleEditChange}
                      className="h-4 w-4 accent-purple-500"
                    />
                    <span>AR Enabled</span>
                  </label>

                  <label className="flex items-center gap-2 rounded-lg border border-purple-400/20 bg-white/5 px-4 py-3">
                    <input
                      type="checkbox"
                      name="featured"
                      checked={editFormData.featured}
                      onChange={handleEditChange}
                      className="h-4 w-4 accent-purple-500"
                    />
                    <span>Featured</span>
                  </label>

                  <label className="flex items-center gap-2 rounded-lg border border-purple-400/20 bg-white/5 px-4 py-3">
                    <input
                      type="checkbox"
                      name="isActive"
                      checked={editFormData.isActive}
                      onChange={handleEditChange}
                      className="h-4 w-4 accent-purple-500"
                    />
                    <span>Active</span>
                  </label>
                </div>

                {editFormData.imageUrl && (
                  <div>
                    <p className="mb-2 text-sm text-gray-300">Preview</p>
                    <img
                      src={editFormData.imageUrl}
                      alt={editFormData.name}
                      className="h-40 w-40 rounded-xl object-cover"
                    />
                  </div>
                )}

                <div className="mt-4 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    className="rounded-lg bg-white/10 px-5 py-3 font-semibold text-white hover:bg-white/20"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-lg bg-purple-500 px-5 py-3 font-semibold text-white hover:bg-purple-600 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;