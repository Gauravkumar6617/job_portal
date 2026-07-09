import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { LogOut, Menu, User, X } from "lucide-react";
import Logo from "../common/Logo.jsx";
import { NAV_LINKS, ROUTES } from "../../utils/constants.js";
import { useAuth } from "../../hooks/useAuth.js";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  const linkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors duration-150 ${
      isActive ? "text-brand-600" : "text-slate-600 hover:text-slate-900"
    }`;

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-all duration-200 ${
        isScrolled
          ? "border-slate-200 bg-white/90 shadow-sm backdrop-blur-lg"
          : "border-transparent bg-white/60 backdrop-blur-lg"
      }`}
    >
      <nav className="section flex h-16 items-center justify-between">
        <Logo />

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <span className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
                <User className="h-4 w-4" />
                {user?.name?.split(" ")[0]}
              </span>
              <button onClick={handleLogout} className="btn-secondary">
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to={ROUTES.LOGIN} className="btn-ghost">
                Log in
              </Link>
              <Link to={ROUTES.REGISTER} className="btn-primary">
                Sign up
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-slate-700 hover:bg-slate-100 md:hidden"
          onClick={() => setIsMobileOpen((open) => !open)}
        >
          {isMobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </nav>

      {isMobileOpen && (
        <div className="border-t border-slate-200 bg-white px-4 pb-6 pt-2 md:hidden animate-fade-in">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2.5 text-sm font-medium ${
                    isActive
                      ? "bg-brand-50 text-brand-700"
                      : "text-slate-700 hover:bg-slate-50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="btn-secondary w-full justify-center"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            ) : (
              <>
                <Link
                  to={ROUTES.LOGIN}
                  className="btn-secondary w-full justify-center"
                >
                  Log in
                </Link>
                <Link
                  to={ROUTES.REGISTER}
                  className="btn-primary w-full justify-center"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
