import { useState, ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ShoppingCart, User as UserIcon } from "lucide-react";
import { TopBar } from "./TopBar";
import { CartSheet } from "./CartSheet";
import { useCart } from "@/lib/CartContext";
import { useAuth } from "@/lib/AuthContext";

const NAV = [
  { label: "Shop", href: "/shop" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Reviews", href: "/#reviews" },
];

export function Layout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartCount, setIsCartOpen } = useCart();
  const { user, isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-bg text-ink flex flex-col">
      <TopBar />
      <header className="sticky top-0 z-50 border-b border-hairline bg-bg/90 backdrop-blur">
        <nav
          aria-label="Main"
          className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4"
        >
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Unique Design Custom Logo" className="h-[120px] w-auto sm:h-[180px]" />
          </Link>

          <ul className="hidden items-center gap-8 md:flex">
            {NAV.map((l) => (
              <li key={l.href}>
                <Link
                  to={l.href}
                  className="spec text-ink transition-colors hover:text-cobalt"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            {isAdmin && (
              <li>
                <Link to="/admin" className="spec text-cobalt transition-colors hover:text-ink font-bold">
                  Admin
                </Link>
              </li>
            )}
          </ul>

          <div className="flex items-center gap-4">
            <Link
              to={user ? "/profile" : "/login"}
              className="p-2 text-ink hover:text-cobalt transition-colors flex items-center gap-2"
              aria-label={user ? "Profile" : "Sign In"}
            >
              <UserIcon size={22} />
            </Link>
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-ink hover:text-cobalt transition-colors"
              aria-label="Open cart"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-bg bg-coral rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              type="button"
              className="p-2 md:hidden"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {menuOpen && (
          <ul className="border-t border-hairline px-5 pb-4 md:hidden">
            {NAV.map((l) => (
              <li key={l.href} className="border-b border-hairline">
                <Link
                  to={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="spec block py-4 text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </header>

      <main className="flex-1" id="top">
        {children}
      </main>

      <footer className="bg-ink text-bg/70 mt-auto">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 border-t border-bg/15 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <img src="/logo.png" alt="Unique Design Custom Logo" className="h-36 w-auto" />
            <p className="spec mt-4 text-bg/60">Printed to order since 2019</p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {["hello@uniquedesigncustom.com", "Instagram", "TikTok", "Shipping & Returns"].map(
              (l) => (
                <li key={l}>
                  <a href="#top" className="spec text-bg/70 transition-colors hover:text-marigold">
                    {l}
                  </a>
                </li>
              ),
            )}
          </ul>
        </div>
        <div className="mx-auto max-w-6xl px-5 pb-8">
          <p className="spec text-bg/45">© 2026 Unique Design Custom. All rights reserved.</p>
        </div>
      </footer>
      <CartSheet />
    </div>
  );
}
