import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { ThemeSwitcherToggle } from "./ui/theme-switch-toggler";

import { useSelector, useDispatch } from "react-redux";
import {
  logoutUser,
  selectCurrentUser,
  selectIsAuthenticated,
} from "../features/auth/authSlice";
import toast, { Toaster } from 'react-hot-toast';

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700&family=Exo+2:wght@300;400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .fnb-root {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    display: flex;
    justify-content: center;
    padding: 16px 24px;
    transition: padding 0.4s ease;
    pointer-events: none;
  }

  .fnb-root.scrolled {
    padding: 10px 24px;
  }

  .fnb-inner {
    pointer-events: all;
    width: 100%;
    max-width: 1100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 28px;
    height: 60px;
    border-radius: 100px;
    border: 1px solid rgba(153, 85, 255, 0.35);
    background: #09070f;
    box-shadow:
      0 8px 32px rgba(0, 0, 0, 0.85),
      0 0 18px rgba(153, 85, 255, 0.2),
      0 1px 0 rgba(153, 85, 255, 0.18) inset;
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    position: relative;
    overflow: visible;
  }

  .fnb-inner::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 100px;
    background: linear-gradient(
      135deg,
      rgba(153,85,255,0.09) 0%,
      rgba(9,7,15,0.01) 50%,
      rgba(153,85,255,0.06) 100%
    );
    pointer-events: none;
  }

  .fnb-inner.scrolled {
    height: 54px;
    background: #09070f;
    box-shadow:
      0 12px 40px rgba(0, 0, 0, 0.9),
      0 0 0 1px rgba(153, 85, 255, 0.3),
      0 0 24px rgba(153, 85, 255, 0.25);
  }

  .fnb-logo {
    font-family: 'Orbitron', monospace;
    font-weight: 700;
    font-size: 15px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    text-decoration: none;
    color: #fffefe;
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    position: relative;
    z-index: 2;
  }

  .fnb-logo-icon {
    width: 28px;
    height: 28px;
    border-radius: 8px;
    background: #9955ff;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    box-shadow: 0 0 16px rgba(153, 85, 255, 0.65);
    flex-shrink: 0;
  }

  .fnb-logo-text span {
    color: #ffffff;
  }

  .fnb-nav {
    display: flex;
    align-items: center;
    gap: 4px;
    list-style: none;
    position: relative;
    z-index: 2;
  }

  .fnb-nav-item {
    position: relative;
  }

  .fnb-nav-link {
    font-family: 'Exo 2', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    letter-spacing: 0.04em;
    color: #aa77ff;
    text-decoration: none;
    padding: 8px 14px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    transition: all 0.22s ease;
    background: transparent;
    border: none;
    white-space: nowrap;
    position: relative;
    user-select: none;
  }

  .fnb-nav-link:hover,
  .fnb-nav-link.active {
    color: #cc99ff;
    background: rgba(153, 85, 255, 0.14);
  }

  .fnb-nav-link.active {
    color: #cc99ff;
    background: rgba(153, 85, 255, 0.16);
    box-shadow: 0 0 0 1px rgba(153, 85, 255, 0.4) inset;
  }

  .fnb-nav-link .fnb-arrow {
    width: 12px;
    height: 12px;
    opacity: 0.7;
    transition: transform 0.22s ease;
    flex-shrink: 0;
  }

  .fnb-nav-link.open .fnb-arrow {
    transform: rotate(180deg);
    opacity: 1;
  }

  .fnb-dropdown {
    position: absolute;
    top: calc(100% + 10px);
    left: 50%;
    transform: translateX(-50%) translateY(-6px);
    min-width: 190px;
    background: #0e0a1a;
    border: 1px solid rgba(153, 85, 255, 0.28);
    border-radius: 16px;
    padding: 8px;
    opacity: 0;
    visibility: hidden;
    transition: all 0.22s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    box-shadow:
      0 20px 60px rgba(0, 0, 0, 0.85),
      0 0 20px rgba(153, 85, 255, 0.18);
    pointer-events: none;
  }

  .fnb-dropdown.open {
    opacity: 1;
    visibility: visible;
    transform: translateX(-50%) translateY(0px);
    pointer-events: all;
  }

  .fnb-dropdown::before {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 10px;
    height: 10px;
    background: #0e0a1a;
    border-left: 1px solid rgba(153, 85, 255, 0.28);
    border-top: 1px solid rgba(153, 85, 255, 0.28);
    border-radius: 2px;
  }

  .fnb-dropdown-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 10px;
    color: #aa77ff;
    font-family: 'Exo 2', sans-serif;
    font-size: 13px;
    font-weight: 400;
    cursor: pointer;
    transition: all 0.18s ease;
    text-decoration: none;
    border: none;
    background: transparent;
    width: 100%;
    text-align: left;
  }

  .fnb-dropdown-item:hover {
    background: rgba(153, 85, 255, 0.14);
    color: #cc99ff;
  }

  .fnb-dropdown-item.danger:hover {
    background: rgba(255, 70, 70, 0.1);
    color: #ff7070;
  }

  .fnb-dropdown-divider {
    height: 1px;
    background: rgba(153, 85, 255, 0.2);
    margin: 6px 8px;
  }

  .fnb-dropdown-icon {
    width: 28px;
    height: 28px;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 13px;
  }

  .fnb-fav-btn {
    font-family: 'Exo 2', sans-serif;
    font-size: 13.5px;
    font-weight: 500;
    letter-spacing: 0.04em;
    color: #aa77ff;
    text-decoration: none;
    padding: 8px 14px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 7px;
    cursor: pointer;
    transition: all 0.22s ease;
    background: transparent;
    border: none;
    position: relative;
  }

  .fnb-fav-btn:hover,
  .fnb-fav-btn.active {
    color: #cc99ff;
    background: rgba(153, 85, 255, 0.14);
  }

  .fnb-fav-count {
    position: absolute;
    top: 4px;
    right: 6px;
    width: 16px;
    height: 16px;
    background: #9955ff;
    border-radius: 50%;
    font-size: 9px;
    font-weight: 700;
    font-family: 'Exo 2', sans-serif;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1.5px solid #09070f;
    box-shadow: 0 0 10px rgba(153, 85, 255, 0.7);
  }

  .fnb-user-icon-btn {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 1px solid rgba(153, 85, 255, 0.35);
    background: rgba(153, 85, 255, 0.12);
    color: #aa77ff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.22s ease;
    position: relative;
    z-index: 2;
  }

  .fnb-user-icon-btn:hover,
  .fnb-user-icon-btn.open {
    color: #cc99ff;
    background: rgba(153, 85, 255, 0.2);
    box-shadow: 0 0 18px rgba(153, 85, 255, 0.35);
  }

  .fnb-glow-line {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 30%;
    height: 1px;
    background: linear-gradient(90deg, transparent, #9955ff, transparent);
    opacity: 0;
    transition: opacity 0.4s ease;
    border-radius: 1px;
  }

  .fnb-inner.scrolled .fnb-glow-line {
    opacity: 0.9;
  }

  @keyframes fnb-fadeIn {
    from { opacity: 0; transform: translateY(-20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .fnb-root {
    animation: fnb-fadeIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  @media (max-width: 768px) {
    .fnb-inner { padding: 0 16px; }
    .fnb-nav { gap: 0; }
    .fnb-nav-link { padding: 8px 10px; font-size: 13px; }
    .fnb-logo-text { display: none; }
  }
`;

const NavIcon = ({ type }) => {
  const icons = {
    home: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    products: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      </svg>
    ),
    heart: (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
      </svg>
    ),
    about: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    user: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    login: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
        <polyline points="10 17 15 12 10 7" />
        <line x1="15" y1="12" x2="3" y2="12" />
      </svg>
    ),
    signup: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="8.5" cy="7" r="4" />
        <line x1="20" y1="8" x2="20" y2="14" />
        <line x1="23" y1="11" x2="17" y2="11" />
      </svg>
    ),
    logout: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    ),
    chevron: (
      <svg className="fnb-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    ),
    grid: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
    star: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  };

  return icons[type] || null;
};

export default function Navbar({ activePage = "home" }) {
  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);

  const userId = currentUser?._id || currentUser?.id;

  // Count all favorites (backend already filters by authenticated user)
  const favCount = useSelector((s) => s.favorites.items.length);

  const currentPage =
    location.pathname === "/"
      ? "home"
      : location.pathname.startsWith("/products")
        ? "products"
        : location.pathname === "/favorites"
          ? "favorites"
          : location.pathname === "/about"
            ? "about"
            : activePage;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggle = (name) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  const handleLogout = async () => {
    setOpenDropdown(null);
    await dispatch(logoutUser());
    toast.success('Logged out successfully!');
    navigate("/login");
  };

  const userLinks = isAuthenticated
    ? [
        {
          label: "Log Out",
          icon: "logout",
          danger: true,
          onClick: handleLogout,
        },
      ]
    : [
        {
          label: "Login",
          icon: "login",
          onClick: () => {
            setOpenDropdown(null);
            navigate("/login");
          },
        },
        {
          label: "Sign Up",
          icon: "signup",
          onClick: () => {
            setOpenDropdown(null);
            navigate("/signup");
          },
        },
      ];

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <style>{styles}</style>

      <nav
        className={`fnb-root${scrolled ? " scrolled" : ""}`}
        ref={navRef}
        aria-label="Main navigation"
      >
        <div className={`fnb-inner${scrolled ? " scrolled" : ""}`}>
          <div className="fnb-glow-line" />

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
            className="fnb-logo"
            aria-label="VizCraft"
          >
            <div className="fnb-logo-icon">◈</div>
            <span className="fnb-logo-text">
              Viz<span>Craft</span>
            </span>
          </a>

          <ul className="fnb-nav" role="menubar">
            <li className="fnb-nav-item" role="none">
              <button
                onClick={() => navigate("/")}
                className={`fnb-nav-link${currentPage === "home" ? " active" : ""}`}
                role="menuitem"
              >
                <NavIcon type="home" />
                Home
              </button>
            </li>

            <li className="fnb-nav-item" role="none">
              <button
                onClick={() => navigate("/products")}
                className={`fnb-nav-link${currentPage === "products" ? " active" : ""}`}
                role="menuitem"
              >
                <NavIcon type="products" />
                All Products
              </button>
            </li>

            <li className="fnb-nav-item" role="none">
              <button
                onClick={() => {
                  if (!isAuthenticated) {
                    navigate("/login", { state: { from: "/favorites" } });
                    return;
                  }

                  navigate("/favorites");
                }}
                className={`fnb-fav-btn${currentPage === "favorites" ? " active" : ""}`}
                aria-label={`Favorites, ${favCount} items`}
                role="menuitem"
              >
                <NavIcon type="heart" />
                Favorites

                {favCount > 0 && (
                  <span className="fnb-fav-count" aria-hidden="true">
                    {favCount}
                  </span>
                )}
              </button>
            </li>

            <li className="fnb-nav-item" role="none">
              <button
                onClick={() => navigate("/about")}
                className={`fnb-nav-link${currentPage === "about" ? " active" : ""}`}
                role="menuitem"
              >
                <NavIcon type="about" />
                About
              </button>
            </li>

            <li className="fnb-nav-item" role="none">
              <button
                className={`fnb-user-icon-btn${openDropdown === "user" ? " open" : ""}`}
                onClick={() => toggle("user")}
                onMouseEnter={() => setOpenDropdown("user")}
                aria-haspopup="true"
                aria-expanded={openDropdown === "user"}
                role="menuitem"
                title={isAuthenticated ? currentUser?.fullName || "Account" : "Login"}
              >
                <NavIcon type="user" />
              </button>

              <div
                className={`fnb-dropdown${openDropdown === "user" ? " open" : ""}`}
                role="menu"
                style={{
                  minWidth: "170px",
                  right: 0,
                  left: "auto",
                  transform:
                    openDropdown === "user"
                      ? "translateX(0) translateY(0)"
                      : "translateX(0) translateY(-6px)",
                }}
              >
                {userLinks.map((item, i) =>
                  item.label === "divider" ? (
                    <div
                      key={i}
                      className="fnb-dropdown-divider"
                      role="separator"
                    />
                  ) : (
                    <button
                      key={item.label}
                      className={`fnb-dropdown-item${item.danger ? " danger" : ""}`}
                      role="menuitem"
                      onClick={item.onClick}
                    >
                      <span
                        className="fnb-dropdown-icon"
                        style={{
                          background: item.danger
                            ? "rgba(255,70,70,0.12)"
                            : "rgba(153,85,255,0.16)",
                          color: item.danger ? "#ff7070" : "#aa77ff",
                        }}
                      >
                        <NavIcon type={item.icon} />
                      </span>
                      {item.label}
                    </button>
                  )
                )}
              </div>
            </li>

            <li
              className="fnb-nav-item"
              role="none"
              style={{ marginLeft: "8px" }}
            >
              <div className="fnb-nav-link" style={{ padding: "8px 10px" }}>
                <ThemeSwitcherToggle />
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}