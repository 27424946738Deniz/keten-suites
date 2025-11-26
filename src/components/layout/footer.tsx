"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Instagram, Facebook } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      {/* Reservation CTA Section */}
      <section className="bg-black py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Left Side - Text */}
            <div className="flex flex-col justify-center">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                İş Seyahatinizi
                <br />
                Keten Suites'de Yapın
              </h2>
              <p className="mb-6 text-gray-400">
                Modern tasarım, tam donanımlı daireler ve merkezi konum ile
                İstanbul'daki konaklamanızı unutulmaz kılın. Hemen rezervasyon
                yapın!
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/units"
                  className="inline-flex items-center gap-2 rounded-lg border border-white px-6 py-3 text-white transition-colors hover:bg-white hover:text-black"
                >
                  Daireleri Keşfet
                </Link>
                <a
                  href="https://api.whatsapp.com/send?phone=905314589979"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-white transition-colors hover:bg-green-700"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Right Side - Quick Contact */}
            <div className="rounded-xl bg-gray-900 p-8">
              <h3 className="mb-6 text-xl font-semibold text-white">
                Bugün Konaklamanızı Rezerve Edin
              </h3>

              <div className="space-y-4">
                <a
                  href="tel:+905314589979"
                  className="flex items-center gap-3 rounded-lg bg-gray-800 p-4 text-white transition-colors hover:bg-gray-700"
                >
                  <Phone className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-400">Bizi Arayın</p>
                    <p className="font-medium">+90 531 458 9979</p>
                  </div>
                </a>

                <a
                  href="mailto:deniz@univotel.com"
                  className="flex items-center gap-3 rounded-lg bg-gray-800 p-4 text-white transition-colors hover:bg-gray-700"
                >
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-400">E-posta Gönderin</p>
                    <p className="font-medium">deniz@univotel.com</p>
                  </div>
                </a>

                <div className="flex items-center gap-3 rounded-lg bg-gray-800 p-4 text-white">
                  <MapPin className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-sm text-gray-400">Adres</p>
                    <p className="font-medium">Nişantaşı, İstanbul</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <div className="bg-gray-900 py-10 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 md:grid-cols-4">
            {/* Logo & Description */}
            <div className="space-y-4">
              <Link href="/" className="inline-block">
                <div className="flex items-center gap-2">
                  <div className="rounded-lg bg-white p-2">
                    <span className="text-xl font-bold text-black">K</span>
                  </div>
                  <span className="text-xl font-bold text-white">
                    Keten Suites
                  </span>
                </div>
              </Link>
              <p className="text-sm text-gray-400">
                İstanbul'da modern, konforlu ve merkezi konumda kiralık
                daireler. İş ve tatil seyahatleriniz için ideal konaklama.
              </p>

              {/* Social Media */}
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/ketensuites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gray-800 p-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.facebook.com/ketensuites"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-gray-800 p-2 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Daireler */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Daireler</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/units"
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    Tüm Daireler
                  </Link>
                </li>
                <li>
                  <Link
                    href="/units?type=1+1"
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    1+1 Daireler
                  </Link>
                </li>
                <li>
                  <Link
                    href="/units?type=2+1"
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    2+1 Daireler
                  </Link>
                </li>
                <li>
                  <Link
                    href="/units?type=dublex"
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    Dubleks Daireler
                  </Link>
                </li>
              </ul>
            </div>

            {/* Sayfalar */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white">Sayfalar</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    Hakkımızda
                  </Link>
                </li>
                <li>
                  <Link
                    href="/sss"
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    SSS
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    İletişim
                  </Link>
                </li>
                <li>
                  <Link
                    href="/booking"
                    className="text-gray-400 transition-colors hover:text-white"
                  >
                    Rezervasyon
                  </Link>
                </li>
              </ul>
            </div>

            {/* İletişim */}
            <div className="space-y-4">
              <h4 className="font-semibold text-white">İletişim</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a
                    href="tel:+905314589979"
                    className="transition-colors hover:text-white"
                  >
                    +90 531 458 9979
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a
                    href="mailto:deniz@univotel.com"
                    className="transition-colors hover:text-white"
                  >
                    deniz@univotel.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>Nişantaşı, Şişli, İstanbul, Türkiye</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-10 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>
              © {currentYear} Keten Suites. Tüm hakları saklıdır. |{" "}
              <Link href="/privacy" className="hover:text-white">
                Gizlilik Politikası
              </Link>{" "}
              |{" "}
              <Link href="/terms" className="hover:text-white">
                Kullanım Şartları
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
