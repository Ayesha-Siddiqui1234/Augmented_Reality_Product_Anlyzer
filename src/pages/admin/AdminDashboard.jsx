import React from "react";
import {
  Package,
  ShoppingCart,
  Users,
  Box,
  Plus,
  ArrowRight,
  Eye,
  LayoutDashboard,
  Tags,
} from "lucide-react";

const stats = [
  {
    title: "Total Products",
    value: "24",
    icon: Package,
    change: "+4 this week",
  },
  {
    title: "Total Orders",
    value: "126",
    icon: ShoppingCart,
    change: "+18 this month",
  },
  {
    title: "Total Users",
    value: "89",
    icon: Users,
    change: "+12 new users",
  },
  {
    title: "AR Products",
    value: "16",
    icon: Box,
    change: "3D/AR enabled",
  },
];

const recentOrders = [
  {
    id: "#ORD-1001",
    customer: "Ali Zia",
    product: "Modern Chair",
    amount: "Rs. 12,000",
    status: "Pending",
  },
  {
    id: "#ORD-1002",
    customer: "Ahmed Khan",
    product: "Wooden Table",
    amount: "Rs. 25,000",
    status: "Delivered",
  },
  {
    id: "#ORD-1003",
    customer: "Sara Malik",
    product: "Office Lamp",
    amount: "Rs. 7,500",
    status: "Processing",
  },
];

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    active: true,
  },
  {
    label: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    label: "Categories",
    href: "/admin/categories",
    icon: Tags,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
  },
];

const getStatusClass = (status) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-400/15 text-yellow-300";
    case "Processing":
      return "bg-[#9955ff]/20 text-purple-200";
    case "Delivered":
      return "bg-emerald-400/15 text-emerald-300";
    default:
      return "bg-white/10 text-white";
  }
};

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-[#090812] text-white">
      <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(153,85,255,0.28),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(153,85,255,0.18),transparent_35%)]">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-[#9955ff]/20 bg-[#0f0d1c]/90 px-5 py-7 backdrop-blur-xl lg:block">
          <div className="mb-10 text-2xl font-extrabold tracking-wide">
            <span className="text-[#9955ff] drop-shadow-[0_0_18px_rgba(153,85,255,0.9)]">
              AR
            </span>{" "}
            Admin
          </div>

          <nav className="space-y-3">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                    item.active
                      ? "bg-[#9955ff]/20 text-white shadow-[0_0_30px_rgba(153,85,255,0.18)]"
                      : "text-[#bdb7d8] hover:bg-[#9955ff]/15 hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </a>
              );
            })}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-hidden px-5 py-6 md:px-8 lg:px-10">
          {/* Mobile top nav */}
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <div className="text-2xl font-extrabold tracking-wide">
              <span className="text-[#9955ff]">AR</span> Admin
            </div>
            <button className="rounded-xl border border-[#9955ff]/30 bg-white/5 px-4 py-2 text-sm text-purple-100">
              Menu
            </button>
          </div>

          {/* Header */}
          <header className="mb-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-1 text-sm text-[#aaa2cf]">Welcome back, Admin</p>
              <h1 className="text-3xl font-bold md:text-4xl">
                Dashboard Overview
              </h1>
            </div>

            <a
              href="/admin/products/add"
              className="flex w-fit items-center gap-2 rounded-2xl bg-gradient-to-r from-[#9955ff] to-[#7c3cff] px-5 py-3 text-sm font-bold text-white shadow-[0_0_35px_rgba(153,85,255,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_55px_rgba(153,85,255,0.55)]"
            >
              <Plus size={18} />
              Add Product
            </a>
          </header>

          {/* Hero */}
          <section className="relative mb-7 overflow-hidden rounded-[28px] border border-[#9955ff]/30 bg-white/[0.055] p-6 shadow-[0_0_45px_rgba(153,85,255,0.18)] md:p-8">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#9955ff]/30 blur-2xl" />

            <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="mb-3 text-sm font-bold text-[#c9b6ff]">
                  3D Commerce Control Center
                </p>

                <h2 className="max-w-2xl text-2xl font-bold leading-tight md:text-4xl">
                  Manage your AR product store from one powerful dashboard.
                </h2>

                <p className="mt-4 max-w-2xl leading-7 text-[#c9c3df]">
                  Track products, orders, users, and 3D model availability for
                  your augmented reality shopping experience.
                </p>
              </div>

              <div className="grid h-36 w-36 shrink-0 place-items-center rounded-full border border-[#9955ff]/40 bg-[#9955ff]/20 text-white shadow-[0_0_80px_rgba(153,85,255,0.5),0_0_120px_rgba(153,85,255,0.15)]">
                <Box size={66} />
              </div>
            </div>
          </section>

          {/* Stats */}
          <section className="mb-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-[22px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_30px_rgba(153,85,255,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#9955ff]/50 hover:shadow-[0_0_45px_rgba(153,85,255,0.18)]"
                >
                  <div className="flex items-center gap-4">
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#9955ff]/20 text-[#b889ff]">
                      <Icon size={26} />
                    </div>

                    <div>
                      <p className="text-sm text-[#aaa2cf]">{item.title}</p>
                      <h3 className="mt-1 text-3xl font-bold">{item.value}</h3>
                      <span className="mt-1 block text-xs text-[#c9b6ff]">
                        {item.change}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>

          {/* Bottom Grid */}
          <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
            {/* Recent Orders */}
            <div className="rounded-[24px] border border-[#9955ff]/20 bg-white/[0.055] p-5 md:p-6">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold">Recent Orders</h2>

                <a
                  href="/admin/orders"
                  className="flex items-center gap-1 text-sm text-[#c9b6ff] hover:text-white"
                >
                  View All <ArrowRight size={16} />
                </a>
              </div>

              <div className="overflow-x-auto">
                <div className="min-w-[720px] space-y-3">
                  <div className="grid grid-cols-5 gap-4 rounded-2xl bg-[#9955ff]/10 px-4 py-3 text-sm font-bold text-[#aaa2cf]">
                    <span>Order</span>
                    <span>Customer</span>
                    <span>Product</span>
                    <span>Amount</span>
                    <span>Status</span>
                  </div>

                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="grid grid-cols-5 gap-4 rounded-2xl bg-white/[0.045] px-4 py-4 text-sm text-[#d7d2eb]"
                    >
                      <span>{order.id}</span>
                      <span>{order.customer}</span>
                      <span>{order.product}</span>
                      <span>{order.amount}</span>
                      <span>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
                            order.status
                          )}`}
                        >
                          {order.status}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-[24px] border border-[#9955ff]/20 bg-white/[0.055] p-5 md:p-6">
              <h2 className="mb-5 text-xl font-bold">Quick Actions</h2>

              <div className="space-y-4">
                <a
                  href="/admin/products/add"
                  className="flex items-center justify-between gap-4 rounded-[18px] border border-[#9955ff]/20 bg-[#9955ff]/10 p-4 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#9955ff]/20 hover:shadow-[0_0_35px_rgba(153,85,255,0.18)]"
                >
                  <div>
                    <h3 className="font-bold">Add New Product</h3>
                    <p className="mt-1 text-sm leading-6 text-[#bdb7d8]">
                      Create product with image, price, stock and 3D model.
                    </p>
                  </div>
                  <Plus size={20} />
                </a>

                <a
                  href="/admin/products"
                  className="flex items-center justify-between gap-4 rounded-[18px] border border-[#9955ff]/20 bg-[#9955ff]/10 p-4 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#9955ff]/20 hover:shadow-[0_0_35px_rgba(153,85,255,0.18)]"
                >
                  <div>
                    <h3 className="font-bold">Manage Products</h3>
                    <p className="mt-1 text-sm leading-6 text-[#bdb7d8]">
                      Edit product details, AR models, stock and pricing.
                    </p>
                  </div>
                  <Package size={20} />
                </a>

                <a
                  href="/admin/orders"
                  className="flex items-center justify-between gap-4 rounded-[18px] border border-[#9955ff]/20 bg-[#9955ff]/10 p-4 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#9955ff]/20 hover:shadow-[0_0_35px_rgba(153,85,255,0.18)]"
                >
                  <div>
                    <h3 className="font-bold">View Orders</h3>
                    <p className="mt-1 text-sm leading-6 text-[#bdb7d8]">
                      Check customer orders and update order status.
                    </p>
                  </div>
                  <Eye size={20} />
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;