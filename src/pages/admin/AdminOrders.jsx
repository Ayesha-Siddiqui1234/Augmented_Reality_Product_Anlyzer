// src/pages/admin/AdminOrders.jsx

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

import {
  ArrowLeft,
  Clock,
  Filter,
  PackageCheck,
  Search,
  ShoppingCart,
  Truck,
  Building2,
  MapPin,
  Phone,
  Mail,
  CreditCard,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/admin/orders";

const statusOptions = [
  "pending",
  "placed",
  "processing",
  "dispatched",
  "delivered",
  "cancelled",
];

const formatStatus = (status = "") => {
  if (!status) return "";
  return status.charAt(0).toUpperCase() + status.slice(1);
};

const formatDate = (date) => {
  if (!date) return "N/A";

  return new Date(date).toLocaleDateString("en-PK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
};

const normalizeOrder = (order) => {
  const shipping = order.shippingAddress || {};

  return {
    id: order._id,
    customerName:
      shipping.fullName || order.user?.fullName || order.user?.name || "N/A",
    email: shipping.email || order.user?.email || "N/A",
    phone: shipping.phone || order.user?.phoneNumber || "N/A",
    address:
      shipping.address ||
      [
        shipping.street,
        shipping.city,
        shipping.province,
        shipping.postalCode,
        shipping.country,
      ]
        .filter(Boolean)
        .join(", ") ||
      "N/A",
    date: order.createdAt,
    products: (order.items || []).map((item) => ({
      name: item.product?.name || item.name || "Product",
      quantity: item.quantity || item.qty || 1,
      price: item.price || item.product?.price || 0,
    })),
    totalAmount:
      order.totalAmount ||
      order.total ||
      order.totalPrice ||
      order.grandTotal ||
      order.itemsPrice ||
      0,
    paymentStatus: order.paymentStatus || "pending",
    orderStatus: order.orderStatus || "pending",
    dispatchCompany: order.dispatchCompany || "",
    dispatchCharges: order.dispatchCharges || 0,
    raw: order,
  };
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [summary, setSummary] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    dispatchedOrders: 0,
    deliveredOrders: 0,
  });

  const [dispatchCompanies, setDispatchCompanies] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const [loading, setLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(API_URL, {
        params: {
          status: selectedStatus,
          search: debouncedSearchTerm,
        },
        headers: getAuthHeaders(),
      });

      const backendOrders = response.data?.orders || [];
      const backendSummary = response.data?.summary || {};

      setOrders(backendOrders.map(normalizeOrder));

      setSummary({
        totalOrders: backendSummary.totalOrders || backendOrders.length || 0,
        pendingOrders: backendSummary.pendingOrders || 0,
        dispatchedOrders: backendSummary.dispatchedOrders || 0,
        deliveredOrders: backendSummary.deliveredOrders || 0,
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch admin orders."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchDispatchCompanies = async () => {
    try {
      const response = await axios.get(`${API_URL}/dispatch-companies`, {
        headers: getAuthHeaders(),
      });

      setDispatchCompanies(response.data?.dispatchCompanies || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch dispatch companies."
      );
    }
  };

  useEffect(() => {
    fetchDispatchCompanies();
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [selectedStatus, debouncedSearchTerm]);

  useEffect(() => {
    if (!successMessage) return;

    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setActionLoadingId(orderId);
      setError("");
      setSuccessMessage("");

      const response = await axios.patch(
        `${API_URL}/${orderId}/status`,
        {
          orderStatus: newStatus,
        },
        {
          headers: getAuthHeaders(),
        }
      );

      const updatedOrder = normalizeOrder(response.data.order);

      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? updatedOrder : order))
      );

      setSuccessMessage(response.data?.message || "Order status updated.");
      fetchOrders();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to update order status."
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDispatchCompanyChange = async (orderId, companyName) => {
    if (!companyName) return;

    try {
      setActionLoadingId(orderId);
      setError("");
      setSuccessMessage("");

      const response = await axios.patch(
        `${API_URL}/${orderId}/dispatch-company`,
        {
          dispatchCompany: companyName,
        },
        {
          headers: getAuthHeaders(),
        }
      );

      const updatedOrder = normalizeOrder(response.data.order);

      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === orderId ? updatedOrder : order))
      );

      setSuccessMessage(
        response.data?.message || "Dispatch company assigned."
      );

      fetchOrders();
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to assign dispatch company."
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  const filteredOrders = useMemo(() => {
    return orders;
  }, [orders]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-400/15 text-yellow-300";
      case "placed":
        return "bg-cyan-400/15 text-cyan-300";
      case "processing":
        return "bg-blue-400/15 text-blue-300";
      case "dispatched":
        return "bg-[#9955ff]/20 text-purple-200";
      case "delivered":
        return "bg-emerald-400/15 text-emerald-300";
      case "cancelled":
        return "bg-red-400/15 text-red-300";
      default:
        return "bg-white/10 text-white";
    }
  };

  const getPaymentBadge = (status) => {
    if (status === "paid") {
      return "bg-emerald-400/15 text-emerald-300";
    }

    if (status === "cancelled") {
      return "bg-red-400/15 text-red-300";
    }

    return "bg-yellow-400/15 text-yellow-300";
  };

  return (
    <div className="min-h-screen bg-[#090812] text-white">
      <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(153,85,255,0.28),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(153,85,255,0.18),transparent_35%)] px-5 py-6 md:px-8 lg:px-10">
        <header className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <a
              href="/admin"
              className="mb-4 flex w-fit items-center gap-2 text-sm text-[#c9b6ff] transition hover:text-white"
            >
              <ArrowLeft size={17} />
              Back to Dashboard
            </a>

            <p className="mb-1 text-sm text-[#aaa2cf]">Order Management</p>

            <h1 className="text-3xl font-bold md:text-4xl">Admin Orders</h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#c9c3df]">
              View all customer orders from MongoDB, update order status, and
              assign dispatch companies.
            </p>
          </div>

          <div className="rounded-2xl border border-[#9955ff]/25 bg-white/[0.055] px-5 py-4 shadow-[0_0_35px_rgba(153,85,255,0.12)]">
            <p className="text-sm text-[#aaa2cf]">Admin Authority</p>
            <p className="mt-1 font-semibold text-[#c9b6ff]">
              Manage orders and dispatch
            </p>
          </div>
        </header>

        {successMessage && (
          <div className="mb-5 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-300">
            ✅ {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
            ❌ {error}
          </div>
        )}

        <section className="mb-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[22px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_30px_rgba(153,85,255,0.08)]">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#9955ff]/20 text-[#b889ff]">
                <ShoppingCart size={26} />
              </div>

              <div>
                <p className="text-sm text-[#aaa2cf]">Total Orders</p>
                <h3 className="mt-1 text-3xl font-bold">
                  {summary.totalOrders}
                </h3>
              </div>
            </div>
          </div>

          <div className="rounded-[22px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_30px_rgba(153,85,255,0.08)]">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-yellow-400/15 text-yellow-300">
                <Clock size={26} />
              </div>

              <div>
                <p className="text-sm text-[#aaa2cf]">Pending</p>
                <h3 className="mt-1 text-3xl font-bold">
                  {summary.pendingOrders}
                </h3>
              </div>
            </div>
          </div>

          <div className="rounded-[22px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_30px_rgba(153,85,255,0.08)]">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#9955ff]/20 text-[#b889ff]">
                <Truck size={26} />
              </div>

              <div>
                <p className="text-sm text-[#aaa2cf]">Dispatched</p>
                <h3 className="mt-1 text-3xl font-bold">
                  {summary.dispatchedOrders}
                </h3>
              </div>
            </div>
          </div>

          <div className="rounded-[22px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_30px_rgba(153,85,255,0.08)]">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-400/15 text-emerald-300">
                <PackageCheck size={26} />
              </div>

              <div>
                <p className="text-sm text-[#aaa2cf]">Delivered</p>
                <h3 className="mt-1 text-3xl font-bold">
                  {summary.deliveredOrders}
                </h3>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-7 xl:grid-cols-[2fr_1fr]">
          <div>
            <section className="mb-6 rounded-[24px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_35px_rgba(153,85,255,0.08)]">
              <div className="grid gap-4 md:grid-cols-[1fr_240px]">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa2cf]"
                  />

                  <input
                    type="text"
                    placeholder="Search by order ID, customer, email, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/80 px-4 py-3 pl-11 text-white outline-none transition placeholder:text-[#77708f] focus:border-[#9955ff]/60 focus:shadow-[0_0_25px_rgba(153,85,255,0.22)]"
                  />

                  {loading && orders.length > 0 && (
                    <p className="mt-2 text-xs text-[#c9b6ff]">
                      Updating orders...
                    </p>
                  )}
                </div>

                <div className="relative">
                  <Filter
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa2cf]"
                  />

                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/80 px-4 py-3 pl-11 text-white outline-none transition focus:border-[#9955ff]/60 focus:shadow-[0_0_25px_rgba(153,85,255,0.22)]"
                  >
                    <option value="all" className="bg-[#0f0d1c]">
                      All Status
                    </option>

                    {statusOptions.map((status) => (
                      <option
                        key={status}
                        value={status}
                        className="bg-[#0f0d1c]"
                      >
                        {formatStatus(status)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            {loading && orders.length === 0 ? (
              <div className="rounded-[26px] border border-[#9955ff]/20 bg-white/[0.055] px-4 py-12 text-center">
                <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#9955ff] border-t-transparent" />
                <h3 className="text-lg font-bold">Loading orders...</h3>
              </div>
            ) : (
              <section className="space-y-5">
                {filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-[26px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_40px_rgba(153,85,255,0.1)] transition-all duration-300 hover:border-[#9955ff]/35 hover:shadow-[0_0_45px_rgba(153,85,255,0.16)]"
                  >
                    <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <div className="mb-3 flex flex-wrap items-center gap-2">
                          <h2 className="text-xl font-bold">
                            #{order.id.slice(-8).toUpperCase()}
                          </h2>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusBadge(
                              order.orderStatus
                            )}`}
                          >
                            {formatStatus(order.orderStatus)}
                          </span>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold ${getPaymentBadge(
                              order.paymentStatus
                            )}`}
                          >
                            {formatStatus(order.paymentStatus)}
                          </span>
                        </div>

                        <p className="text-sm text-[#aaa2cf]">
                          Placed on {formatDate(order.date)}
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
                      <div className="rounded-2xl border border-white/5 bg-[#0f0d1c]/60 p-4">
                        <h3 className="mb-4 font-bold text-white">
                          Customer Details
                        </h3>

                        <div className="space-y-3 text-sm text-[#c9c3df]">
                          <p className="flex items-center gap-2">
                            <Building2 size={15} className="text-[#c9b6ff]" />
                            {order.customerName}
                          </p>

                          <p className="flex items-center gap-2">
                            <Mail size={15} className="text-[#c9b6ff]" />
                            {order.email}
                          </p>

                          <p className="flex items-center gap-2">
                            <Phone size={15} className="text-[#c9b6ff]" />
                            {order.phone}
                          </p>

                          <p className="flex items-start gap-2">
                            <MapPin
                              size={15}
                              className="mt-1 text-[#c9b6ff]"
                            />
                            {order.address}
                          </p>
                        </div>
                      </div>

                      <div className="rounded-2xl border border-white/5 bg-[#0f0d1c]/60 p-4">
                        <h3 className="mb-4 font-bold text-white">
                          Ordered Products
                        </h3>

                        <div className="space-y-3">
                          {order.products.map((product, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between gap-4 rounded-xl bg-white/[0.045] px-4 py-3"
                            >
                              <div>
                                <p className="font-semibold text-white">
                                  {product.name}
                                </p>

                                <p className="mt-1 text-xs text-[#aaa2cf]">
                                  Quantity: {product.quantity}
                                </p>
                              </div>

                              <p className="font-bold text-[#c9b6ff]">
                                Rs. {Number(product.price || 0).toLocaleString()}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                          <p className="flex items-center gap-2 text-sm text-[#aaa2cf]">
                            <CreditCard size={15} />
                            Total Amount
                          </p>

                          <p className="text-xl font-bold text-white">
                            Rs. {Number(order.totalAmount || 0).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-4 lg:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-[#c9c3df]">
                          Assign Dispatch Company
                        </label>

                        <select
                          value={order.dispatchCompany}
                          disabled={actionLoadingId === order.id}
                          onChange={(e) =>
                            handleDispatchCompanyChange(order.id, e.target.value)
                          }
                          className="w-full rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/80 px-4 py-3 text-white outline-none transition focus:border-[#9955ff]/60 focus:shadow-[0_0_25px_rgba(153,85,255,0.22)] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <option value="" className="bg-[#0f0d1c]">
                            Select dispatch company
                          </option>

                          {dispatchCompanies.map((company) => (
                            <option
                              key={company.name}
                              value={company.name}
                              className="bg-[#0f0d1c]"
                            >
                              {company.name} - Rs. {company.charges}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-medium text-[#c9c3df]">
                          Update Order Status
                        </label>

                        <select
                          value={order.orderStatus}
                          disabled={actionLoadingId === order.id}
                          onChange={(e) =>
                            handleStatusChange(order.id, e.target.value)
                          }
                          className="w-full rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/80 px-4 py-3 text-white outline-none transition focus:border-[#9955ff]/60 focus:shadow-[0_0_25px_rgba(153,85,255,0.22)] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {statusOptions.map((status) => (
                            <option
                              key={status}
                              value={status}
                              className="bg-[#0f0d1c]"
                            >
                              {formatStatus(status)}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredOrders.length === 0 && (
                  <div className="rounded-[26px] border border-[#9955ff]/20 bg-white/[0.055] px-4 py-12 text-center">
                    <ShoppingCart
                      size={48}
                      className="mx-auto mb-3 text-[#9955ff]"
                    />
                    <h3 className="text-lg font-bold">No orders found</h3>
                    <p className="mt-2 text-sm text-[#aaa2cf]">
                      Try changing your search or status filter.
                    </p>
                  </div>
                )}
              </section>
            )}
          </div>

          <aside className="space-y-5">
            <div className="sticky top-6 rounded-[26px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_40px_rgba(153,85,255,0.12)]">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Dispatch Shortlist</h2>
                  <p className="mt-1 text-sm text-[#aaa2cf]">
                    Companies available for order delivery.
                  </p>
                </div>

                <Truck size={24} className="text-[#c9b6ff]" />
              </div>

              <div className="space-y-4">
                {dispatchCompanies.map((company) => (
                  <div
                    key={company.name}
                    className="rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/70 p-4 transition-all duration-300 hover:border-[#9955ff]/40 hover:bg-[#9955ff]/10"
                  >
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold text-white">
                          {company.name}
                        </h3>

                        <p className="mt-1 text-xs text-[#aaa2cf]">
                          {company.cityCoverage}
                        </p>
                      </div>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold ${
                          company.status === "Available"
                            ? "bg-emerald-400/15 text-emerald-300"
                            : "bg-yellow-400/15 text-yellow-300"
                        }`}
                      >
                        {company.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-xl bg-white/[0.045] p-3">
                        <p className="text-xs text-[#aaa2cf]">Delivery</p>
                        <p className="mt-1 font-semibold text-white">
                          {company.deliveryTime}
                        </p>
                      </div>

                      <div className="rounded-xl bg-white/[0.045] p-3">
                        <p className="text-xs text-[#aaa2cf]">Charges</p>
                        <p className="mt-1 font-semibold text-white">
                          Rs. {company.charges}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-sm">
                      <p className="text-[#aaa2cf]">Rating</p>
                      <p className="font-bold text-[#c9b6ff]">
                        {company.rating}/5
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-[#9955ff]/20 bg-[#9955ff]/10 p-4">
                <p className="text-sm font-bold text-[#c9b6ff]">
                  Suggested Flow
                </p>

                <p className="mt-2 text-sm leading-6 text-[#c9c3df]">
                  Pending/placed order → assign dispatch company → mark
                  Processing → mark Dispatched → mark Delivered.
                </p>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
};

export default AdminOrders;