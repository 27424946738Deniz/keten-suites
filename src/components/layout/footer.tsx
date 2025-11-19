import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container py-10 md:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <Link href="/" className="inline-block">
              <Image
                src="/keten-insaat-nisantasi-nda-bulunuyor-635534678637043799-m.jpg"
                alt="Keten Suites"
                width={140}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-muted-foreground">
              Modern rental apartments and housing solutions in Istanbul.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Daireler</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/units"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Tüm Daireler
                </Link>
              </li>
              <li>
                <Link
                  href="/booking"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Rezervasyon Yap
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="text-sm font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                Email:{" "}
                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@keten.com"}`}
                  className="hover:text-foreground transition-colors"
                >
                  {process.env.NEXT_PUBLIC_CONTACT_EMAIL || "info@keten.com"}
                </a>
              </li>
              <li>
                Phone:{" "}
                <a
                  href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE || "+90 555 123 4567"}`}
                  className="hover:text-foreground transition-colors"
                >
                  {process.env.NEXT_PUBLIC_CONTACT_PHONE || "+90 555 123 4567"}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} Keten Suites. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

