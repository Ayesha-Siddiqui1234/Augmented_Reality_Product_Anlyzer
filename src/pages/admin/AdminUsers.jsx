import React, { useMemo, useState } from "react";
import {
  ArrowLeft,
  Ban,
  CheckCircle,
  Edit,
  Eye,
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

const usersData = [
  {
    id: "u1",
    name: "Ali Zia Khan",
    email: "ali@example.com",
    phone: "+92 300 1234567",
    role: "admin",
    status: "active",
    joinedAt: "2026-04-12",
    orders: 8,
    totalSpent: 145000,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "u2",
    name: "Ahmed Khan",
    email: "ahmed@example.com",
    phone: "+92 301 2223344",
    role: "user",
    status: "active",
    joinedAt: "2026-04-18",
    orders: 4,
    totalSpent: 64000,
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "u3",
    name: "Sara Malik",
    email: "sara@example.com",
    phone: "+92 302 5557788",
    role: "user",
    status: "active",
    joinedAt: "2026-04-25",
    orders: 2,
    totalSpent: 29500,
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "u4",
    name: "Usman Raza",
    email: "usman@example.com",
    phone: "+92 303 9911223",
    role: "user",
    status: "blocked",
    joinedAt: "2026-03-29",
    orders: 1,
    totalSpent: 12000,
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80",
  },
];

const AdminUsers = () => {
  const [users, setUsers] = useState(usersData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.phone.toLowerCase().includes(searchTerm.toLowerCase());

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

  const handleToggleStatus = (userId) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "active" ? "blocked" : "active",
            }
          : user
      )
    );
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

            <p className="mb-1 text-sm text-[#aaa2cf]">User Management</p>

            <h1 className="text-3xl font-bold md:text-4xl">Admin Users</h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#c9c3df]">
              View registered users, track their orders, manage account status,
              and control admin/user roles.
            </p>
          </div>

          <div className="rounded-2xl border border-[#9955ff]/25 bg-white/[0.055] px-5 py-4 shadow-[0_0_35px_rgba(153,85,255,0.12)]">
            <p className="text-sm text-[#aaa2cf]">Admin Authority</p>
            <p className="mt-1 font-semibold text-[#c9b6ff]">
              View, edit, block/unblock users
            </p>
          </div>
        </header>

        {/* Summary Cards */}
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

        {/* Filters */}
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

        {/* Users Table */}
        <section className="rounded-[26px] border border-[#9955ff]/20 bg-white/[0.055] p-5 shadow-[0_0_40px_rgba(153,85,255,0.1)]">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">All Users</h2>
              <p className="mt-1 text-sm text-[#aaa2cf]">
                Showing {filteredUsers.length} of {users.length} users
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[1100px] space-y-3">
              {/* Table Head */}
              <div className="grid grid-cols-[2.3fr_1.5fr_1fr_1fr_1fr_1.2fr_1.2fr] gap-4 rounded-2xl bg-[#9955ff]/10 px-4 py-3 text-sm font-bold text-[#aaa2cf]">
                <span>User</span>
                <span>Contact</span>
                <span>Role</span>
                <span>Status</span>
                <span>Orders</span>
                <span>Total Spent</span>
                <span className="text-right">Actions</span>
              </div>

              {/* Table Rows */}
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="grid grid-cols-[2.3fr_1.5fr_1fr_1fr_1fr_1.2fr_1.2fr] items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.045] px-4 py-4 text-sm text-[#d7d2eb] transition-all duration-300 hover:border-[#9955ff]/30 hover:bg-[#9955ff]/10 hover:shadow-[0_0_30px_rgba(153,85,255,0.12)]"
                >
                  {/* User */}
                  <div className="flex items-center gap-4">
                    <div className="h-14 w-14 overflow-hidden rounded-2xl border border-[#9955ff]/20 bg-[#0f0d1c]">
                      <img
                        src={user.avatar}
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

                  {/* Contact */}
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

                  {/* Role */}
                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-bold capitalize ${getRoleBadge(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>

                  {/* Status */}
                  <span
                    className={`w-fit rounded-full px-3 py-1 text-xs font-bold capitalize ${getStatusBadge(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>

                  {/* Orders */}
                  <div>
                    <p className="flex items-center gap-2 font-bold text-white">
                      <ShoppingBag size={15} className="text-[#c9b6ff]" />
                      {user.orders}
                    </p>
                    <p className="mt-1 text-xs text-[#aaa2cf]">orders</p>
                  </div>

                  {/* Total Spent */}
                  <p className="font-bold text-white">
                    Rs. {user.totalSpent.toLocaleString()}
                  </p>

                  {/* Actions */}
                  <div className="flex justify-end gap-2">
                   


                    <button
                      type="button"
                      title={
                        user.status === "active"
                          ? "Block user"
                          : "Unblock user"
                      }
                      onClick={() => handleToggleStatus(user.id)}
                      className={`grid h-10 w-10 place-items-center rounded-xl transition ${
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

              {filteredUsers.length === 0 && (
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