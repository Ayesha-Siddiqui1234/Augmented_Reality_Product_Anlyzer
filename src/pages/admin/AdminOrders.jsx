import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  Eye,
  Filter,
  PackageCheck,
  Search,
  ShoppingCart,
  Truck,
  XCircle,
  Building2,
  MapPin,
  Phone,
  Mail,
  CreditCard,
} from "lucide-react";

const dispatchCompanies = [
  {
    id: "dc1",
    name: "TCS Express",
    cityCoverage: "Nationwide",
    deliveryTime: "2-4 days",
    charges: 350,
    rating: 4.7,
    status: "Available",
  },
  {
    id: "dc2",
    name: "Leopards Courier",
    cityCoverage: "Major Cities",
    deliveryTime: "3-5 days",
    charges: 300,
    rating: 4.5,
    status: "Available",
  },
  {
    id: "dc3",
    name: "M&P Courier",
    cityCoverage: "Nationwide",
    deliveryTime: "2-5 days",
    charges: 320,
    rating: 4.4,
    status: "Available",
  },
  {
    id: "dc4",
    name: "Call Courier",
    cityCoverage: "Urban Areas",
    deliveryTime: "2-3 days",
    charges: 280,
    rating: 4.3,
    status: "Limited",
  },
];

const initialOrders = [
  {
    id: "ORD-1001",
    customerName: "Ahmed Khan",
    email: "ahmed@example.com",
    phone: "+92 300 1234567",
    address: "House 21, DHA Phase 6, Lahore",
    date: "2026-05-03",
    products: [
      {
        name: "Modern Lounge Chair",
        quantity: 1,
        price: 18500,
      },
      {
        name: "Minimal Floor Lamp",
        quantity: 1,
        price: 9200,
      },
    ],
    totalAmount: 27700,
    paymentStatus: "Paid",
    orderStatus: "Pending",
    dispatchCompany: "",
  },
  {
    id: "ORD-1002",
    customerName: "Sara Malik",
    email: "sara@example.com",
    phone: "+92 301 9988776",
    address: "Gulshan-e-Iqbal, Karachi",
    date: "2026-05-02",
    products: [
      {
        name: "Scandinavian Coffee Table",
        quantity: 1,
        price: 14500,
      },
    ],
    totalAmount: 14500,
    paymentStatus: "Cash on Delivery",
    orderStatus: "Processing",
    dispatchCompany: "TCS Express",
  },
  {
    id: "ORD-1003",
    customerName: "Usman Raza",
    email: "usman@example.com",
    phone: "+92 302 4455667",
    address: "Satellite Town, Rawalpindi",
    date: "2026-05-01",
    products: [
      {
        name: "Modern Two-Seater Sofa",
        quantity: 1,
        price: 48000,
      },
    ],
    totalAmount: 48000,
    paymentStatus: "Paid",
    orderStatus: "Dispatched",
    dispatchCompany: "Leopards Courier",
  },
  {
    id: "ORD-1004",
    customerName: "Hassan Ali",
    email: "hassan@example.com",
    phone: "+92 303 2244668",
    address: "Model Town, Multan",
    date: "2026-04-30",
    products: [
      {
        name: "Compact Study Desk",
        quantity: 1,
        price: 21000,
      },
      {
        name: "Bedside Storage Cabinet",
        quantity: 1,
        price: 12500,
      },
    ],
    totalAmount: 33500,
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    dispatchCompany: "M&P Courier",
  },
];

const AdminOrders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.phone.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        selectedStatus === "All" || order.orderStatus === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, selectedStatus]);

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "Pending"
  ).length;
  const dispatchedOrders = orders.filter(
    (order) => order.orderStatus === "Dispatched"
  ).length;
  const deliveredOrders = orders.filter(
    (order) => order.orderStatus === "Delivered"
  ).length;

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, orderStatus: newStatus } : order
      )
    );
  };

  const handleDispatchCompanyChange = (orderId, companyName) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId
          ? {
              ...order,
              dispatchCompany: companyName,
              orderStatus:
                companyName && order.orderStatus === "Pending"
                  ? "Processing"
                  : order.orderStatus,
            }
          : order
      )
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-400/15 text-yellow-300";
      case "Processing":
        return "bg-blue-400/15 text-blue-300";
      case "Dispatched":
        return "bg-[#9955ff]/20 text-purple-200";
      case "Delivered":
        return "bg-emerald-400/15 text-emerald-300";
      case "Cancelled":
        return "bg-red-400/15 text-red-300";
      default:
        return "bg-white/10 text-white";
    }
  };

  const getPaymentBadge = (status) => {
    if (status === "Paid") {
      return "bg-emerald-400/15 text-emerald-300";
    }

    return "bg-yellow-400/15 text-yellow-300";
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

            <p className="mb-1 text-sm text-[#aaa2cf]">Order Management</p>

            <h1 className="text-3xl font-bold md:text-4xl">Admin Orders</h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#c9c3df]">
              View all customer orders, update order status, and assign pending
              orders to dispatch companies.
            </p>
          </div>

          <div className="rounded-2xl border border-[#9955ff]/25 bg-white/[0.055] px-5 py-4 shadow-[0_0_35px_rgba(153,85,255,0.12)]">
            <p className="text-sm text-[#aaa2cf]">Admin Authority</p>
            <p className="mt-1 font-semibold text-[#c9b6ff]">
              Manage orders and dispatch
            </p>
          </div>
        </header>

        {/* Summary Cards */}
        <section className="mb-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-[22px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_30px_rgba(153,85,255,0.08)]">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#9955ff]/20 text-[#b889ff]">
                <ShoppingCart size={26} />
              </div>
              <div>
                <p className="text-sm text-[#aaa2cf]">Total Orders</p>
                <h3 className="mt-1 text-3xl font-bold">{totalOrders}</h3>
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
                <h3 className="mt-1 text-3xl font-bold">{pendingOrders}</h3>
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
                <h3 className="mt-1 text-3xl font-bold">{dispatchedOrders}</h3>
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
                <h3 className="mt-1 text-3xl font-bold">{deliveredOrders}</h3>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-7 xl:grid-cols-[2fr_1fr]">
          {/* Orders Section */}
          <div>
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
                    placeholder="Search by order ID, customer, email, or phone..."
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
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/80 px-4 py-3 pl-11 text-white outline-none transition focus:border-[#9955ff]/60 focus:shadow-[0_0_25px_rgba(153,85,255,0.22)]"
                  >
                    <option value="All" className="bg-[#0f0d1c]">
                      All Status
                    </option>
                    <option value="Pending" className="bg-[#0f0d1c]">
                      Pending
                    </option>
                    <option value="Processing" className="bg-[#0f0d1c]">
                      Processing
                    </option>
                    <option value="Dispatched" className="bg-[#0f0d1c]">
                      Dispatched
                    </option>
                    <option value="Delivered" className="bg-[#0f0d1c]">
                      Delivered
                    </option>
                    <option value="Cancelled" className="bg-[#0f0d1c]">
                      Cancelled
                    </option>
                  </select>
                </div>
              </div>
            </section>

            {/* Orders List */}
            <section className="space-y-5">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-[26px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_40px_rgba(153,85,255,0.1)] transition-all duration-300 hover:border-[#9955ff]/35 hover:shadow-[0_0_45px_rgba(153,85,255,0.16)]"
                >
                  {/* Order Top */}
                  <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <h2 className="text-xl font-bold">{order.id}</h2>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusBadge(
                            order.orderStatus
                          )}`}
                        >
                          {order.orderStatus}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${getPaymentBadge(
                            order.paymentStatus
                          )}`}
                        >
                          {order.paymentStatus}
                        </span>
                      </div>

                      <p className="text-sm text-[#aaa2cf]">
                        Placed on {order.date}
                      </p>
                    </div>

                   
                  </div>

                  {/* Customer + Products */}
                  <div className="grid gap-5 lg:grid-cols-[1fr_1.2fr]">
                    {/* Customer Info */}
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

                    {/* Products */}
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
                              Rs. {product.price.toLocaleString()}
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
                          Rs. {order.totalAmount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Dispatch Controls */}
                  <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-[#c9c3df]">
                        Assign Dispatch Company
                      </label>

                      <select
                        value={order.dispatchCompany}
                        onChange={(e) =>
                          handleDispatchCompanyChange(order.id, e.target.value)
                        }
                        className="w-full rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/80 px-4 py-3 text-white outline-none transition focus:border-[#9955ff]/60 focus:shadow-[0_0_25px_rgba(153,85,255,0.22)]"
                      >
                        <option value="" className="bg-[#0f0d1c]">
                          Select dispatch company
                        </option>

                        {dispatchCompanies.map((company) => (
                          <option
                            key={company.id}
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
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        className="w-full rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/80 px-4 py-3 text-white outline-none transition focus:border-[#9955ff]/60 focus:shadow-[0_0_25px_rgba(153,85,255,0.22)]"
                      >
                        <option value="Pending" className="bg-[#0f0d1c]">
                          Pending
                        </option>
                        <option value="Processing" className="bg-[#0f0d1c]">
                          Processing
                        </option>
                        <option value="Dispatched" className="bg-[#0f0d1c]">
                          Dispatched
                        </option>
                        <option value="Delivered" className="bg-[#0f0d1c]">
                          Delivered
                        </option>
                        <option value="Cancelled" className="bg-[#0f0d1c]">
                          Cancelled
                        </option>
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
          </div>

          {/* Dispatch Companies Shortlist */}
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
                    key={company.id}
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
                  Pending order → assign dispatch company → mark Processing →
                  mark Dispatched → mark Delivered.
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