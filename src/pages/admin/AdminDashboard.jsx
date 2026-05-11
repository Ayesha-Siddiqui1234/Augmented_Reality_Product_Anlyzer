// import React from "react";
// import {
//   Package,
//   ShoppingCart,
//   Users,
//   Box,
//   Plus,
//   ArrowRight,
//   Eye,
//   LayoutDashboard,
//   Tags,
// } from "lucide-react";

// const stats = [
//   {
//     title: "Total Products",
//     value: "24",
//     icon: Package,
//     change: "+4 this week",
//   },
//   {
//     title: "Total Orders",
//     value: "126",
//     icon: ShoppingCart,
//     change: "+18 this month",
//   },
//   {
//     title: "Total Users",
//     value: "89",
//     icon: Users,
//     change: "+12 new users",
//   },
//   {
//     title: "AR Products",
//     value: "16",
//     icon: Box,
//     change: "3D/AR enabled",
//   },
// ];



// const navItems = [
//   {
//     label: "Dashboard",
//     href: "/admin",
//     icon: LayoutDashboard,
//     active: true,
//   },
//   {
//     label: "Products",
//     href: "/admin/products",
//     icon: Package,
//   },
//   {
//     label: "Orders",
//     href: "/admin/orders",
//     icon: ShoppingCart,
//   },
//   {
//     label: "Users",
//     href: "/admin/users",
//     icon: Users,
//   },
// ];

// const getStatusClass = (status) => {
//   switch (status) {
//     case "Pending":
//       return "bg-yellow-400/15 text-yellow-300";
//     case "Processing":
//       return "bg-[#9955ff]/20 text-purple-200";
//     case "Delivered":
//       return "bg-emerald-400/15 text-emerald-300";
//     default:
//       return "bg-white/10 text-white";
//   }
// };

// const AdminDashboard = () => {
//   return (
//     <div className="min-h-screen bg-[#090812] text-white">
//       <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(153,85,255,0.28),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(153,85,255,0.18),transparent_35%)]">
//         {/* Sidebar */}
//         <aside className="hidden w-64 shrink-0 border-r border-[#9955ff]/20 bg-[#0f0d1c]/90 px-5 py-7 backdrop-blur-xl lg:block">
//           <div className="mb-10 text-2xl font-extrabold tracking-wide">
//             <span className="text-[#9955ff] drop-shadow-[0_0_18px_rgba(153,85,255,0.9)]">
//               AR
//             </span>{" "}
//             Admin
//           </div>

//           <nav className="space-y-3">
//             {navItems.map((item) => {
//               const Icon = item.icon;

//               return (
//                 <a
//                   key={item.label}
//                   href={item.href}
//                   className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
//                     item.active
//                       ? "bg-[#9955ff]/20 text-white shadow-[0_0_30px_rgba(153,85,255,0.18)]"
//                       : "text-[#bdb7d8] hover:bg-[#9955ff]/15 hover:text-white"
//                   }`}
//                 >
//                   <Icon size={18} />
//                   {item.label}
//                 </a>
//               );
//             })}
//           </nav>
//         </aside>

//         {/* Main */}
//         <main className="flex-1 overflow-hidden px-5 py-6 md:px-8 lg:px-10">
//           {/* Mobile top nav */}
//           <div className="mb-6 flex items-center justify-between lg:hidden">
//             <div className="text-2xl font-extrabold tracking-wide">
//               <span className="text-[#9955ff]">AR</span> Admin
//             </div>
//             <button className="rounded-xl border border-[#9955ff]/30 bg-white/5 px-4 py-2 text-sm text-purple-100">
//               Menu
//             </button>
//           </div>

//           {/* Header */}
//           <header className="mb-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//             <div>
//               <p className="mb-1 text-sm text-[#aaa2cf]">Welcome back, Admin</p>
//               <h1 className="text-3xl font-bold md:text-4xl">
//                 Dashboard Overview
//               </h1>
//             </div>

//             <a
//               href="/admin/products/add"
//               className="flex w-fit items-center gap-2 rounded-2xl bg-gradient-to-r from-[#9955ff] to-[#7c3cff] px-5 py-3 text-sm font-bold text-white shadow-[0_0_35px_rgba(153,85,255,0.35)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_55px_rgba(153,85,255,0.55)]"
//             >
//               <Plus size={18} />
//               Add Product
//             </a>
//           </header>

//           {/* Hero */}
//           <section className="relative mb-7 overflow-hidden rounded-[28px] border border-[#9955ff]/30 bg-white/[0.055] p-6 shadow-[0_0_45px_rgba(153,85,255,0.18)] md:p-8">
//             <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#9955ff]/30 blur-2xl" />

//             <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
//               <div>
//                 <p className="mb-3 text-sm font-bold text-[#c9b6ff]">
//                   3D Commerce Control Center
//                 </p>

//                 <h2 className="max-w-2xl text-2xl font-bold leading-tight md:text-4xl">
//                   Manage your AR product store from one powerful dashboard.
//                 </h2>

//                 <p className="mt-4 max-w-2xl leading-7 text-[#c9c3df]">
//                   Track products, orders, users, and 3D model availability for
//                   your augmented reality shopping experience.
//                 </p>
//               </div>

//               <div className="grid h-36 w-36 shrink-0 place-items-center rounded-full border border-[#9955ff]/40 bg-[#9955ff]/20 text-white shadow-[0_0_80px_rgba(153,85,255,0.5),0_0_120px_rgba(153,85,255,0.15)]">
//                 <Box size={66} />
//               </div>
//             </div>
//           </section>

//           {/* Stats */}
//           <section className="mb-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
//             {stats.map((item) => {
//               const Icon = item.icon;

//               return (
//                 <div
//                   key={item.title}
//                   className="group rounded-[22px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_30px_rgba(153,85,255,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-[#9955ff]/50 hover:shadow-[0_0_45px_rgba(153,85,255,0.18)]"
//                 >
//                   <div className="flex items-center gap-4">
//                     <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#9955ff]/20 text-[#b889ff]">
//                       <Icon size={26} />
//                     </div>

//                     <div>
//                       <p className="text-sm text-[#aaa2cf]">{item.title}</p>
//                       <h3 className="mt-1 text-3xl font-bold">{item.value}</h3>
//                       <span className="mt-1 block text-xs text-[#c9b6ff]">
//                         {item.change}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </section>

//           {/* Bottom Grid */}
//           <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
//            {/* Store Management Flow */}
// <div className="rounded-[24px] border border-[#9955ff]/20 bg-white/[0.055] p-5 md:p-6 shadow-[0_0_35px_rgba(153,85,255,0.08)]">
//   <div className="mb-6 flex items-center justify-between">
//     <div>
//       <h2 className="text-xl font-bold">Store Management Flow</h2>
//       <p className="mt-1 text-sm text-[#aaa2cf]">
//         A quick guide to manage your AR ecommerce workflow smoothly.
//       </p>
//     </div>

//     <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#9955ff]/20 text-[#c9b6ff]">
//       <LayoutDashboard size={22} />
//     </div>
//   </div>

//   <div className="grid gap-4 md:grid-cols-2">
//     <div className="rounded-[20px] border border-[#9955ff]/20 bg-[#0f0d1c]/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#9955ff]/40 hover:bg-[#9955ff]/10">
//       <div className="mb-4 flex items-center gap-3">
//         <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#9955ff]/20 text-[#c9b6ff]">
//           <Package size={22} />
//         </div>

//         <div>
//           <h3 className="font-bold text-white">Product Setup</h3>
//           <p className="text-xs text-[#aaa2cf]">Step 01</p>
//         </div>
//       </div>

//       <p className="text-sm leading-6 text-[#c9c3df]">
//         Add product details, upload image links, set stock quantity, and attach
//         3D/GLB model URLs for AR preview.
//       </p>

//       <a
//         href="/admin/products/add"
//         className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#c9b6ff] hover:text-white"
//       >
//         Add Product <ArrowRight size={15} />
//       </a>
//     </div>

//     <div className="rounded-[20px] border border-[#9955ff]/20 bg-[#0f0d1c]/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#9955ff]/40 hover:bg-[#9955ff]/10">
//       <div className="mb-4 flex items-center gap-3">
//         <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-400/15 text-blue-300">
//           <ShoppingCart size={22} />
//         </div>

//         <div>
//           <h3 className="font-bold text-white">Order Handling</h3>
//           <p className="text-xs text-[#aaa2cf]">Step 02</p>
//         </div>
//       </div>

//       <p className="text-sm leading-6 text-[#c9c3df]">
//         Review customer orders, assign dispatch companies, and update order
//         progress from placed to delivered.
//       </p>

//       <a
//         href="/admin/orders"
//         className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#c9b6ff] hover:text-white"
//       >
//         Manage Orders <ArrowRight size={15} />
//       </a>
//     </div>

//     <div className="rounded-[20px] border border-[#9955ff]/20 bg-[#0f0d1c]/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#9955ff]/40 hover:bg-[#9955ff]/10">
//       <div className="mb-4 flex items-center gap-3">
//         <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-400/15 text-emerald-300">
//           <Users size={22} />
//         </div>

//         <div>
//           <h3 className="font-bold text-white">User Control</h3>
//           <p className="text-xs text-[#aaa2cf]">Step 03</p>
//         </div>
//       </div>

//       <p className="text-sm leading-6 text-[#c9c3df]">
//         View registered users, monitor their activity, and block or unblock
//         accounts when needed.
//       </p>

//       <a
//         href="/admin/users"
//         className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#c9b6ff] hover:text-white"
//       >
//         View Users <ArrowRight size={15} />
//       </a>
//     </div>

//     <div className="rounded-[20px] border border-[#9955ff]/20 bg-[#0f0d1c]/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#9955ff]/40 hover:bg-[#9955ff]/10">
//       <div className="mb-4 flex items-center gap-3">
//         <div className="grid h-11 w-11 place-items-center rounded-2xl bg-purple-400/15 text-purple-300">
//           <Box size={22} />
//         </div>

//         <div>
//           <h3 className="font-bold text-white">AR Experience</h3>
//           <p className="text-xs text-[#aaa2cf]">Step 04</p>
//         </div>
//       </div>

//       <p className="text-sm leading-6 text-[#c9c3df]">
//         Keep products AR-ready by adding valid 3D model links and ensuring
//         product images are clean and realistic.
//       </p>

//       <a
//         href="/admin/products"
//         className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#c9b6ff] hover:text-white"
//       >
//         Check Products <ArrowRight size={15} />
//       </a>
//     </div>
//   </div>
// </div>

//             {/* Quick Actions */}
//             <div className="rounded-[24px] border border-[#9955ff]/20 bg-white/[0.055] p-5 md:p-6">
//               <h2 className="mb-5 text-xl font-bold">Quick Actions</h2>

//               <div className="space-y-4">
//                 <a
//                   href="/admin/products/add"
//                   className="flex items-center justify-between gap-4 rounded-[18px] border border-[#9955ff]/20 bg-[#9955ff]/10 p-4 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#9955ff]/20 hover:shadow-[0_0_35px_rgba(153,85,255,0.18)]"
//                 >
//                   <div>
//                     <h3 className="font-bold">Add New Product</h3>
//                     <p className="mt-1 text-sm leading-6 text-[#bdb7d8]">
//                       Create product with image, price, stock and 3D model.
//                     </p>
//                   </div>
//                   <Plus size={20} />
//                 </a>

//                 <a
//                   href="/admin/products"
//                   className="flex items-center justify-between gap-4 rounded-[18px] border border-[#9955ff]/20 bg-[#9955ff]/10 p-4 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#9955ff]/20 hover:shadow-[0_0_35px_rgba(153,85,255,0.18)]"
//                 >
//                   <div>
//                     <h3 className="font-bold">Manage Products</h3>
//                     <p className="mt-1 text-sm leading-6 text-[#bdb7d8]">
//                       Edit product details, AR models, stock and pricing.
//                     </p>
//                   </div>
//                   <Package size={20} />
//                 </a>

//                 <a
//                   href="/admin/orders"
//                   className="flex items-center justify-between gap-4 rounded-[18px] border border-[#9955ff]/20 bg-[#9955ff]/10 p-4 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#9955ff]/20 hover:shadow-[0_0_35px_rgba(153,85,255,0.18)]"
//                 >
//                   <div>
//                     <h3 className="font-bold">View Orders</h3>
//                     <p className="mt-1 text-sm leading-6 text-[#bdb7d8]">
//                       Check customer orders and update order status.
//                     </p>
//                   </div>
//                   <Eye size={20} />
//                 </a>
//               </div>
//             </div>
//           </section>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


// src/pages/admin/AdminDashboard.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Package,
  ShoppingCart,
  Users,
  Box,
  Plus,
  ArrowRight,
  Eye,
  LayoutDashboard,
} from "lucide-react";

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

const AdminDashboard = () => {
  const [dashboardStats, setDashboardStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    arProducts: 0,
  });

  const [statsLoading, setStatsLoading] = useState(false);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
      Authorization: `Bearer ${token}`,
    };
  };

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setStatsLoading(true);

        const [productsResponse, ordersResponse, usersResponse] =
          await Promise.all([
            axios.get("http://localhost:5000/api/admin/products", {
              headers: getAuthHeaders(),
            }),
            axios.get("http://localhost:5000/api/admin/orders", {
              headers: getAuthHeaders(),
            }),
            axios.get("http://localhost:5000/api/admin/users", {
              headers: getAuthHeaders(),
            }),
          ]);

        const products =
          productsResponse.data?.products ||
          productsResponse.data?.data?.products ||
          productsResponse.data?.data ||
          [];

        const orders =
          ordersResponse.data?.orders ||
          ordersResponse.data?.data?.orders ||
          [];

        const users =
          usersResponse.data?.users ||
          usersResponse.data?.data?.users ||
          usersResponse.data?.data ||
          [];

        const ordersSummary = ordersResponse.data?.summary || {};
        const usersSummary = usersResponse.data?.summary || {};

        const arProducts = products.filter((product) => {
          return (
            product.arEnabled ||
            product.arSupported ||
            product.modelUrl ||
            product.glbModel
          );
        }).length;

        setDashboardStats({
          totalProducts:
            productsResponse.data?.pagination?.totalProducts ||
            productsResponse.data?.totalProducts ||
            products.length,

          totalOrders:
            ordersSummary.totalOrders ||
            ordersResponse.data?.totalOrders ||
            orders.length,

          totalUsers:
            usersSummary.totalUsers ||
            usersResponse.data?.totalUsers ||
            users.length,

          arProducts,
        });
      } catch (error) {
        console.error(
          "Failed to fetch dashboard stats:",
          error.response?.data?.message || error.message
        );
      } finally {
        setStatsLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const stats = [
    {
      title: "Total Products",
      value: statsLoading ? "..." : dashboardStats.totalProducts,
      icon: Package,
      change: "Products in database",
    },
    {
      title: "Total Orders",
      value: statsLoading ? "..." : dashboardStats.totalOrders,
      icon: ShoppingCart,
      change: "Orders placed by users",
    },
    {
      title: "Total Users",
      value: statsLoading ? "..." : dashboardStats.totalUsers,
      icon: Users,
      change: "Registered users",
    },
    {
      title: "AR Products",
      value: statsLoading ? "..." : dashboardStats.arProducts,
      icon: Box,
      change: "3D/AR enabled",
    },
  ];

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
              <p className="mb-1 text-sm text-[#aaa2cf]">
                Welcome back, Admin
              </p>

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

                      <h3 className="mt-1 text-3xl font-bold">
                        {item.value}
                      </h3>

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
            {/* Store Management Flow */}
            <div className="rounded-[24px] border border-[#9955ff]/20 bg-white/[0.055] p-5 md:p-6 shadow-[0_0_35px_rgba(153,85,255,0.08)]">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">Store Management Flow</h2>
                  <p className="mt-1 text-sm text-[#aaa2cf]">
                    A quick guide to manage your AR ecommerce workflow smoothly.
                  </p>
                </div>

                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#9955ff]/20 text-[#c9b6ff]">
                  <LayoutDashboard size={22} />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[20px] border border-[#9955ff]/20 bg-[#0f0d1c]/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#9955ff]/40 hover:bg-[#9955ff]/10">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-[#9955ff]/20 text-[#c9b6ff]">
                      <Package size={22} />
                    </div>

                    <div>
                      <h3 className="font-bold text-white">Product Setup</h3>
                      <p className="text-xs text-[#aaa2cf]">Step 01</p>
                    </div>
                  </div>

                  <p className="text-sm leading-6 text-[#c9c3df]">
                    Add product details, upload image links, set stock quantity,
                    and attach 3D/GLB model URLs for AR preview.
                  </p>

                  <a
                    href="/admin/products/add"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#c9b6ff] hover:text-white"
                  >
                    Add Product <ArrowRight size={15} />
                  </a>
                </div>

                <div className="rounded-[20px] border border-[#9955ff]/20 bg-[#0f0d1c]/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#9955ff]/40 hover:bg-[#9955ff]/10">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue-400/15 text-blue-300">
                      <ShoppingCart size={22} />
                    </div>

                    <div>
                      <h3 className="font-bold text-white">Order Handling</h3>
                      <p className="text-xs text-[#aaa2cf]">Step 02</p>
                    </div>
                  </div>

                  <p className="text-sm leading-6 text-[#c9c3df]">
                    Review customer orders, assign dispatch companies, and
                    update order progress from placed to delivered.
                  </p>

                  <a
                    href="/admin/orders"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#c9b6ff] hover:text-white"
                  >
                    Manage Orders <ArrowRight size={15} />
                  </a>
                </div>

                <div className="rounded-[20px] border border-[#9955ff]/20 bg-[#0f0d1c]/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#9955ff]/40 hover:bg-[#9955ff]/10">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-400/15 text-emerald-300">
                      <Users size={22} />
                    </div>

                    <div>
                      <h3 className="font-bold text-white">User Control</h3>
                      <p className="text-xs text-[#aaa2cf]">Step 03</p>
                    </div>
                  </div>

                  <p className="text-sm leading-6 text-[#c9c3df]">
                    View registered users, monitor their activity, and block or
                    unblock accounts when needed.
                  </p>

                  <a
                    href="/admin/users"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#c9b6ff] hover:text-white"
                  >
                    View Users <ArrowRight size={15} />
                  </a>
                </div>

                <div className="rounded-[20px] border border-[#9955ff]/20 bg-[#0f0d1c]/70 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#9955ff]/40 hover:bg-[#9955ff]/10">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-purple-400/15 text-purple-300">
                      <Box size={22} />
                    </div>

                    <div>
                      <h3 className="font-bold text-white">AR Experience</h3>
                      <p className="text-xs text-[#aaa2cf]">Step 04</p>
                    </div>
                  </div>

                  <p className="text-sm leading-6 text-[#c9c3df]">
                    Keep products AR-ready by adding valid 3D model links and
                    ensuring product images are clean and realistic.
                  </p>

                  <a
                    href="/admin/products"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#c9b6ff] hover:text-white"
                  >
                    Check Products <ArrowRight size={15} />
                  </a>
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