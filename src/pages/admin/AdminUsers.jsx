// import React, { useMemo, useState } from "react";
// import {
//   ArrowLeft,
//   Ban,
//   CheckCircle,
//   Edit,
//   Eye,
//   Filter,
//   Mail,
//   Phone,
//   Search,
//   ShieldCheck,
//   ShoppingBag,
//   User,
//   Users,
//   UserCheck,
//   UserX,
// } from "lucide-react";

// const API_URL = "http://localhost:5000/api/admin/users";

// const AdminUsers = () => {

//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedRole, setSelectedRole] = useState("All");
//   const [selectedStatus, setSelectedStatus] = useState("All");

//   const filteredUsers = useMemo(() => {
//     return users.filter((user) => {
//       const matchesSearch =
//         user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         user.phone.toLowerCase().includes(searchTerm.toLowerCase());

//       const matchesRole =
//         selectedRole === "All" || user.role === selectedRole.toLowerCase();

//       const matchesStatus =
//         selectedStatus === "All" ||
//         user.status === selectedStatus.toLowerCase();

//       return matchesSearch && matchesRole && matchesStatus;
//     });
//   }, [users, searchTerm, selectedRole, selectedStatus]);

//   const totalUsers = users.length;
//   const activeUsers = users.filter((user) => user.status === "active").length;
//   const blockedUsers = users.filter((user) => user.status === "blocked").length;
//   const adminUsers = users.filter((user) => user.role === "admin").length;

//   const handleToggleStatus = (userId) => {
//     setUsers((prevUsers) =>
//       prevUsers.map((user) =>
//         user.id === userId
//           ? {
//               ...user,
//               status: user.status === "active" ? "blocked" : "active",
//             }
//           : user
//       )
//     );
//   };

//   const getRoleBadge = (role) => {
//     if (role === "admin") {
//       return "bg-[#9955ff]/20 text-purple-200";
//     }

//     return "bg-blue-400/15 text-blue-300";
//   };

//   const getStatusBadge = (status) => {
//     if (status === "active") {
//       return "bg-emerald-400/15 text-emerald-300";
//     }

//     return "bg-red-400/15 text-red-300";
//   };

//   return (
//     <div className="min-h-screen bg-[#090812] text-white">
//       <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(153,85,255,0.28),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(153,85,255,0.18),transparent_35%)] px-5 py-6 md:px-8 lg:px-10">
//         {/* Header */}
//         <header className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
//           <div>
//             <a
//               href="/admin"
//               className="mb-4 flex w-fit items-center gap-2 text-sm text-[#c9b6ff] transition hover:text-white"
//             >
//               <ArrowLeft size={17} />
//               Back to Dashboard
//             </a>

//             <p className="mb-1 text-sm text-[#aaa2cf]">User Management</p>

//             <h1 className="text-3xl font-bold md:text-4xl">Admin Users</h1>

//             <p className="mt-2 max-w-2xl text-sm leading-6 text-[#c9c3df]">
//               View registered users, track their orders, manage account status,
//               and control admin/user roles.
//             </p>
//           </div>

//           <div className="rounded-2xl border border-[#9955ff]/25 bg-white/[0.055] px-5 py-4 shadow-[0_0_35px_rgba(153,85,255,0.12)]">
//             <p className="text-sm text-[#aaa2cf]">Admin Authority</p>
//             <p className="mt-1 font-semibold text-[#c9b6ff]">
//               View, edit, block/unblock users
//             </p>
//           </div>
//         </header>

//         {/* Summary Cards */}
//         <section className="mb-7 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
//           <div className="rounded-[22px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_30px_rgba(153,85,255,0.08)]">
//             <div className="flex items-center gap-4">
//               <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#9955ff]/20 text-[#b889ff]">
//                 <Users size={26} />
//               </div>

//               <div>
//                 <p className="text-sm text-[#aaa2cf]">Total Users</p>
//                 <h3 className="mt-1 text-3xl font-bold">{totalUsers}</h3>
//               </div>
//             </div>
//           </div>

//           <div className="rounded-[22px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_30px_rgba(153,85,255,0.08)]">
//             <div className="flex items-center gap-4">
//               <div className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-400/15 text-emerald-300">
//                 <UserCheck size={26} />
//               </div>

//               <div>
//                 <p className="text-sm text-[#aaa2cf]">Active Users</p>
//                 <h3 className="mt-1 text-3xl font-bold">{activeUsers}</h3>
//               </div>
//             </div>
//           </div>

//           <div className="rounded-[22px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_30px_rgba(153,85,255,0.08)]">
//             <div className="flex items-center gap-4">
//               <div className="grid h-14 w-14 place-items-center rounded-2xl bg-red-400/15 text-red-300">
//                 <UserX size={26} />
//               </div>

//               <div>
//                 <p className="text-sm text-[#aaa2cf]">Blocked Users</p>
//                 <h3 className="mt-1 text-3xl font-bold">{blockedUsers}</h3>
//               </div>
//             </div>
//           </div>

//           <div className="rounded-[22px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_30px_rgba(153,85,255,0.08)]">
//             <div className="flex items-center gap-4">
//               <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#9955ff]/20 text-[#b889ff]">
//                 <ShieldCheck size={26} />
//               </div>

//               <div>
//                 <p className="text-sm text-[#aaa2cf]">Admin Users</p>
//                 <h3 className="mt-1 text-3xl font-bold">{adminUsers}</h3>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Filters */}
//         <section className="mb-6 rounded-[24px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_35px_rgba(153,85,255,0.08)]">
//           <div className="grid gap-4 lg:grid-cols-[1fr_220px_220px]">
//             <div className="relative">
//               <Search
//                 size={18}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa2cf]"
//               />

//               <input
//                 type="text"
//                 placeholder="Search by name, email, or phone..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/80 px-4 py-3 pl-11 text-white outline-none transition placeholder:text-[#77708f] focus:border-[#9955ff]/60 focus:shadow-[0_0_25px_rgba(153,85,255,0.22)]"
//               />
//             </div>

//             <div className="relative">
//               <ShieldCheck
//                 size={18}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa2cf]"
//               />

//               <select
//                 value={selectedRole}
//                 onChange={(e) => setSelectedRole(e.target.value)}
//                 className="w-full rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/80 px-4 py-3 pl-11 text-white outline-none transition focus:border-[#9955ff]/60 focus:shadow-[0_0_25px_rgba(153,85,255,0.22)]"
//               >
//                 <option value="All" className="bg-[#0f0d1c]">
//                   All Roles
//                 </option>
//                 <option value="Admin" className="bg-[#0f0d1c]">
//                   Admin
//                 </option>
//                 <option value="User" className="bg-[#0f0d1c]">
//                   User
//                 </option>
//               </select>
//             </div>

//             <div className="relative">
//               <Filter
//                 size={18}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa2cf]"
//               />

//               <select
//                 value={selectedStatus}
//                 onChange={(e) => setSelectedStatus(e.target.value)}
//                 className="w-full rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/80 px-4 py-3 pl-11 text-white outline-none transition focus:border-[#9955ff]/60 focus:shadow-[0_0_25px_rgba(153,85,255,0.22)]"
//               >
//                 <option value="All" className="bg-[#0f0d1c]">
//                   All Status
//                 </option>
//                 <option value="Active" className="bg-[#0f0d1c]">
//                   Active
//                 </option>
//                 <option value="Blocked" className="bg-[#0f0d1c]">
//                   Blocked
//                 </option>
//               </select>
//             </div>
//           </div>
//         </section>

//         {/* Users Table */}
//         <section className="rounded-[26px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_40px_rgba(153,85,255,0.1)]">
//           <div className="mb-5 flex items-center justify-between">
//             <div>
//               <h2 className="text-xl font-bold">All Users</h2>
//               <p className="mt-1 text-sm text-[#aaa2cf]">
//                 Showing {filteredUsers.length} of {users.length} users
//               </p>
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <div className="min-w-[1100px] space-y-3">
//               {/* Table Head */}
//               <div className="grid grid-cols-[2.3fr_1.5fr_1fr_1fr_1fr_1.2fr_1.2fr] gap-4 rounded-2xl bg-[#9955ff]/10 px-4 py-3 text-sm font-bold text-[#aaa2cf]">
//                 <span>User</span>
//                 <span>Contact</span>
//                 <span>Role</span>
//                 <span>Status</span>
//                 <span>Orders</span>
//                 <span>Total Spent</span>
//                 <span className="text-right">Actions</span>
//               </div>

//               {/* Table Rows */}
//               {filteredUsers.map((user) => (
//                 <div
//                   key={user.id}
//                   className="grid grid-cols-[2.3fr_1.5fr_1fr_1fr_1fr_1.2fr_1.2fr] items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.045] px-4 py-4 text-sm text-[#d7d2eb] transition-all duration-300 hover:border-[#9955ff]/30 hover:bg-[#9955ff]/10 hover:shadow-[0_0_30px_rgba(153,85,255,0.12)]"
//                 >
//                   {/* User */}
//                   <div className="flex items-center gap-4">
//                     <div className="h-14 w-14 overflow-hidden rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]">
//                       <img
//                         src={user.avatar}
//                         alt={user.name}
//                         className="h-full w-full object-cover"
//                       />
//                     </div>

//                     <div>
//                       <h3 className="font-bold text-white">{user.name}</h3>
//                       <p className="mt-1 text-xs text-[#aaa2cf]">
//                         Joined {user.joinedAt}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Contact */}
//                   <div>
//                     <p className="flex items-center gap-2 text-xs text-[#c9c3df]">
//                       <Mail size={14} />
//                       {user.email}
//                     </p>
//                     <p className="mt-2 flex items-center gap-2 text-xs text-[#aaa2cf]">
//                       <Phone size={14} />
//                       {user.phone}
//                     </p>
//                   </div>

//                   {/* Role */}
//                   <span
//                     className={`w-fit rounded-full px-3 py-1 text-xs font-bold capitalize ${getRoleBadge(
//                       user.role
//                     )}`}
//                   >
//                     {user.role}
//                   </span>

//                   {/* Status */}
//                   <span
//                     className={`w-fit rounded-full px-3 py-1 text-xs font-bold capitalize ${getStatusBadge(
//                       user.status
//                     )}`}
//                   >
//                     {user.status}
//                   </span>

//                   {/* Orders */}
//                   <div>
//                     <p className="flex items-center gap-2 font-bold text-white">
//                       <ShoppingBag size={15} className="text-[#c9b6ff]" />
//                       {user.orders}
//                     </p>
//                     <p className="mt-1 text-xs text-[#aaa2cf]">orders</p>
//                   </div>

//                   {/* Total Spent */}
//                   <p className="font-bold text-white">
//                     Rs. {user.totalSpent.toLocaleString()}
//                   </p>

//                   {/* Actions */}
//                   <div className="flex justify-end gap-2">
                   


//                     <button
//                       type="button"
//                       title={
//                         user.status === "active"
//                           ? "Block user"
//                           : "Unblock user"
//                       }
//                       onClick={() => handleToggleStatus(user.id)}
//                       className={`grid h-10 w-10 place-items-center rounded-xl transition ${
//                         user.status === "active"
//                           ? "border border-red-400/20 bg-red-400/10 text-red-300 hover:bg-red-400/20"
//                           : "border border-emerald-400/20 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/20"
//                       }`}
//                     >
//                       {user.status === "active" ? (
//                         <Ban size={17} />
//                       ) : (
//                         <CheckCircle size={17} />
//                       )}
//                     </button>
//                   </div>
//                 </div>
//               ))}

//               {filteredUsers.length === 0 && (
//                 <div className="rounded-2xl border border-[#9955ff]/20 bg-white/[0.045] px-4 py-12 text-center">
//                   <User size={48} className="mx-auto mb-3 text-[#9955ff]" />
//                   <h3 className="text-lg font-bold">No users found</h3>
//                   <p className="mt-2 text-sm text-[#aaa2cf]">
//                     Try changing your search, role, or status filter.
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default AdminUsers;



// src/pages/admin/AdminUsers.jsx

import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";

import {
  ArrowLeft,
  Ban,
  CheckCircle,
  Filter,
  Mail,
  Phone,
  Search,
  ShieldCheck,
  ShoppingBag,
  User,
  Users,
  UserCheck,
  UserX,
} from "lucide-react";

const API_URL = API_ENDPOINTS.ADMIN_USERS;

const defaultAvatar =
  "https://ui-avatars.com/api/?background=9955ff&color=fff&name=User";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const [loading, setLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
      Authorization: `Bearer ${token}`,
    };
  };

  const normalizeUser = (user) => {
    const name = user.fullName || user.name || "Unknown User";

    return {
      id: user._id || user.id,
      name,
      email: user.email || "N/A",
      phone: user.phoneNumber || user.phone || "N/A",
      role: user.role || "user",
      status: user.isBlocked ? "blocked" : "active",
      isBlocked: Boolean(user.isBlocked),
      joinedAt: user.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-PK", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : "N/A",
      orders: user.orders || 0,
      totalSpent: user.totalSpent || 0,
      avatar:
        user.avatar ||
        `https://ui-avatars.com/api/?background=9955ff&color=fff&name=${encodeURIComponent(
          name
        )}`,
    };
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(API_URL, {
        headers: getAuthHeaders(),
      });

      const backendUsers = response.data?.users || response.data?.data || [];

      setUsers(backendUsers.map(normalizeUser));
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch users."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (!successMessage) return;

    const timer = setTimeout(() => {
      setSuccessMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage]);

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      setError("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [error]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const query = searchTerm.toLowerCase();

      const matchesSearch =
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.phone.toLowerCase().includes(query);

      const matchesRole =
        selectedRole === "All" || user.role === selectedRole.toLowerCase();

      const matchesStatus =
        selectedStatus === "All" ||
        user.status === selectedStatus.toLowerCase();

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, selectedRole, selectedStatus]);

  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === "active").length;
  const blockedUsers = users.filter((user) => user.status === "blocked").length;
  const adminUsers = users.filter((user) => user.role === "admin").length;

  const handleToggleStatus = async (userId) => {
    try {
      setActionLoadingId(userId);
      setError("");
      setSuccessMessage("");

      const response = await axios.patch(
        `${API_URL}/${userId}/toggle-block`,
        {},
        {
          headers: getAuthHeaders(),
        }
      );

      const updatedBackendUser = response.data?.user;

      if (!updatedBackendUser) {
        throw new Error("Updated user not returned from backend.");
      }

      const updatedUser = normalizeUser(updatedBackendUser);

      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === userId ? updatedUser : user))
      );

      setSuccessMessage(
        response.data?.message || "User status updated successfully."
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Failed to update user status."
      );
    } finally {
      setActionLoadingId(null);
    }
  };

  const getRoleBadge = (role) => {
    if (role === "admin") {
      return "bg-[#9955ff]/20 text-purple-200";
    }

    return "bg-blue-400/15 text-blue-300";
  };

  const getStatusBadge = (status) => {
    if (status === "active") {
      return "bg-emerald-400/15 text-emerald-300";
    }

    return "bg-red-400/15 text-red-300";
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

            <p className="mb-1 text-sm text-[#aaa2cf]">User Management</p>

            <h1 className="text-3xl font-bold md:text-4xl">Admin Users</h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#c9c3df]">
              View registered users, track their orders, and block or unblock
              user accounts.
            </p>
          </div>

          <div className="rounded-2xl border border-[#9955ff]/25 bg-white/[0.055] px-5 py-4 shadow-[0_0_35px_rgba(153,85,255,0.12)]">
            <p className="text-sm text-[#aaa2cf]">Admin Authority</p>
            <p className="mt-1 font-semibold text-[#c9b6ff]">
              View and block/unblock users
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
                <Users size={26} />
              </div>

              <div>
                <p className="text-sm text-[#aaa2cf]">Total Users</p>
                <h3 className="mt-1 text-3xl font-bold">{totalUsers}</h3>
              </div>
            </div>
          </div>

          <div className="rounded-[22px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_30px_rgba(153,85,255,0.08)]">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-emerald-400/15 text-emerald-300">
                <UserCheck size={26} />
              </div>

              <div>
                <p className="text-sm text-[#aaa2cf]">Active Users</p>
                <h3 className="mt-1 text-3xl font-bold">{activeUsers}</h3>
              </div>
            </div>
          </div>

          <div className="rounded-[22px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_30px_rgba(153,85,255,0.08)]">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-red-400/15 text-red-300">
                <UserX size={26} />
              </div>

              <div>
                <p className="text-sm text-[#aaa2cf]">Blocked Users</p>
                <h3 className="mt-1 text-3xl font-bold">{blockedUsers}</h3>
              </div>
            </div>
          </div>

          <div className="rounded-[22px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_30px_rgba(153,85,255,0.08)]">
            <div className="flex items-center gap-4">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-[#9955ff]/20 text-[#b889ff]">
                <ShieldCheck size={26} />
              </div>

              <div>
                <p className="text-sm text-[#aaa2cf]">Admin Users</p>
                <h3 className="mt-1 text-3xl font-bold">{adminUsers}</h3>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-6 rounded-[24px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_35px_rgba(153,85,255,0.08)]">
          <div className="grid gap-4 lg:grid-cols-[1fr_220px_220px]">
            <div className="relative">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa2cf]"
              />

              <input
                type="text"
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/80 px-4 py-3 pl-11 text-white outline-none transition placeholder:text-[#77708f] focus:border-[#9955ff]/60 focus:shadow-[0_0_25px_rgba(153,85,255,0.22)]"
              />
            </div>

            <div className="relative">
              <ShieldCheck
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#aaa2cf]"
              />

              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]/80 px-4 py-3 pl-11 text-white outline-none transition focus:border-[#9955ff]/60 focus:shadow-[0_0_25px_rgba(153,85,255,0.22)]"
              >
                <option value="All" className="bg-[#0f0d1c]">
                  All Roles
                </option>
                <option value="Admin" className="bg-[#0f0d1c]">
                  Admin
                </option>
                <option value="User" className="bg-[#0f0d1c]">
                  User
                </option>
              </select>
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
                <option value="Active" className="bg-[#0f0d1c]">
                  Active
                </option>
                <option value="Blocked" className="bg-[#0f0d1c]">
                  Blocked
                </option>
              </select>
            </div>
          </div>
        </section>

        <section className="rounded-[26px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_40px_rgba(153,85,255,0.1)]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">All Users</h2>
              <p className="mt-1 text-sm text-[#aaa2cf]">
                Showing {filteredUsers.length} of {users.length} users
              </p>
            </div>

            {loading && (
              <p className="text-sm text-[#c9b6ff]">Loading users...</p>
            )}
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[1100px] space-y-3">
              <div className="grid grid-cols-[2.3fr_1.5fr_1fr_1fr_1fr_1.2fr_1.2fr] gap-4 rounded-2xl bg-[#9955ff]/10 px-4 py-3 text-sm font-bold text-[#aaa2cf]">
                <span>User</span>
                <span>Contact</span>
                <span>Role</span>
                <span>Status</span>
                <span>Orders</span>
                <span>Total Spent</span>
                <span className="text-right">Actions</span>
              </div>

              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="grid grid-cols-[2.3fr_1.5fr_1fr_1fr_1fr_1.2fr_1.2fr] items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.045] px-4 py-4 text-sm text-[#d7d2eb] transition-all duration-300 hover:border-[#9955ff]/30 hover:bg-[#9955ff]/10 hover:shadow-[0_0_30px_rgba(153,85,255,0.12)]"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 overflow-hidden rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]">
                      <img
                        src={user.avatar || defaultAvatar}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="font-bold text-white">{user.name}</h3>
                      <p className="mt-1 text-xs text-[#aaa2cf]">
                        Joined {user.joinedAt}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="flex items-center gap-2 text-xs text-[#c9c3df]">
                      <Mail size={14} />
                      {user.email}
                    </p>

                    <p className="mt-2 flex items-center gap-2 text-xs text-[#aaa2cf]">
                      <Phone size={14} />
                      {user.phone}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-bold capitalize ${getRoleBadge(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>

                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-bold capitalize ${getStatusBadge(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>

                  <div>
                    <p className="flex items-center gap-2 font-bold text-white">
                      <ShoppingBag size={15} className="text-[#c9b6ff]" />
                      {user.orders}
                    </p>
                    <p className="mt-1 text-xs text-[#aaa2cf]">orders</p>
                  </div>

                  <p className="font-bold text-white">
                    Rs. {Number(user.totalSpent || 0).toLocaleString()}
                  </p>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      disabled={actionLoadingId === user.id}
                      title={
                        user.status === "active"
                          ? "Block user"
                          : "Unblock user"
                      }
                      onClick={() => handleToggleStatus(user.id)}
                      className={`grid h-10 w-10 place-items-center rounded-xl transition disabled:cursor-not-allowed disabled:opacity-50 ${
                        user.status === "active"
                          ? "border border-red-400/20 bg-red-400/10 text-red-300 hover:bg-red-400/20"
                          : "border border-emerald-400/20 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/20"
                      }`}
                    >
                      {user.status === "active" ? (
                        <Ban size={17} />
                      ) : (
                        <CheckCircle size={17} />
                      )}
                    </button>
                  </div>
                </div>
              ))}

              {filteredUsers.length === 0 && !loading && (
                <div className="rounded-2xl border border-[#9955ff]/20 bg-white/[0.045] px-4 py-12 text-center">
                  <User size={48} className="mx-auto mb-3 text-[#9955ff]" />
                  <h3 className="text-lg font-bold">No users found</h3>
                  <p className="mt-2 text-sm text-[#aaa2cf]">
                    Try changing your search, role, or status filter.
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

export default AdminUsers;