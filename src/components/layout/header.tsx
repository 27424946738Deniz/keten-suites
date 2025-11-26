"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, X, Phone, ChevronRight } from "lucide-react";

const navItems = [
  { href: "/", label: "Anasayfa" },
  { href: "/units", label: "Daireler" },
  { href: "/sss", label: "SSS" },
  { href: "/contact", label: "İletişim" },
];

export const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-50 flex items-center gap-3">
              <div className={cn(
                "flex h-10 w-10 items-center justify-center rounded-xl font-bold text-lg transition-colors",
                isScrolled || isOpen ? "bg-black text-white" : "bg-white text-black"
              )}>
                K
              </div>
              <span className={cn(
                "text-xl font-bold tracking-tight transition-colors",
                isScrolled || isOpen ? "text-gray-900" : "text-white"
              )}>
                Keten Suites
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                    pathname === item.href
                      ? isScrolled
                        ? "text-black bg-gray-100"
                        : "text-white bg-white/20"
                      : isScrolled
                        ? "text-gray-600 hover:text-black hover:bg-gray-100"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Phone */}
              <a
                href="tel:+905314589979"
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors",
                  isScrolled
                    ? "text-gray-600 hover:text-black"
                    : "text-white/80 hover:text-white"
                )}
              >
                <Phone className="h-4 w-4" />
                <span>+90 531 458 9979</span>
              </a>

              {/* CTA Button */}
              <Button
                asChild
                className={cn(
                  "rounded-xl px-6 font-semibold transition-all",
                  isScrolled
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-white text-black hover:bg-gray-100"
                )}
              >
                <Link href="/units">Rezervasyon</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "relative z-50 flex h-10 w-10 items-center justify-center rounded-xl lg:hidden transition-colors",
                isOpen
                  ? "bg-gray-100 text-black"
                  : isScrolled
                    ? "bg-gray-100 text-black"
                    : "bg-white/20 text-white"
              )}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-white transition-all duration-300 lg:hidden",
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex h-full flex-col pt-24 px-6">
          {/* Navigation Links */}
          <nav className="flex-1 space-y-1">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between py-4 text-2xl font-semibold transition-all border-b border-gray-100",
                  pathname === item.href
                    ? "text-black"
                    : "text-gray-400 hover:text-black",
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-8 opacity-0"
                )}
                style={{
                  transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
                }}
              >
                {item.label}
                <ChevronRight className="h-5 w-5" />
              </Link>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div
            className={cn(
              "pb-8 space-y-4 transition-all duration-300",
              isOpen
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            )}
            style={{
              transitionDelay: isOpen ? "200ms" : "0ms",
            }}
          >
            {/* Phone */}
            <a
              href="tel:+905314589979"
              className="flex items-center justify-center gap-3 rounded-xl border-2 border-gray-200 py-4 text-lg font-semibold text-gray-700 transition-colors hover:border-black hover:text-black"
            >
              <Phone className="h-5 w-5" />
              +90 531 458 9979
            </a>

            {/* WhatsApp */}
            <a
              href="https://api.whatsapp.com/send?phone=905314589979"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-xl bg-green-500 py-4 text-lg font-semibold text-white transition-colors hover:bg-green-600"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>

            {/* Reservation Button */}
            <Link
              href="/units"
              className="flex items-center justify-center rounded-xl bg-black py-4 text-lg font-semibold text-white transition-colors hover:bg-gray-800"
            >
              Rezervasyon Yap
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
