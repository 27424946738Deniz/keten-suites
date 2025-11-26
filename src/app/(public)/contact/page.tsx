"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  Instagram,
  Facebook,
  Linkedin,
  CheckCircle2,
} from "lucide-react";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSubmitted(true);
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[300px] md:h-[400px] overflow-hidden">
        <Image
          src="/keten dışarıdan arka plan.jpg"
          alt="Keten Suites Dış Görünüm"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
            Bize Ulaşın
          </span>
          <h1 className="text-center text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            İletişim
          </h1>
          <p className="mt-4 max-w-2xl text-center text-lg text-white/80">
            Sorularınız, rezervasyonlarınız ve kurumsal işbirliği talepleriniz için bize ulaşın
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="relative z-10 -mt-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-4 md:grid-cols-4">
            {/* Phone */}
            <a
              href="tel:+905314589979"
              className="group flex flex-col items-center rounded-2xl bg-white p-6 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white transition-transform group-hover:scale-110">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="mb-1 font-semibold text-gray-900">Telefon</h3>
              <p className="text-center text-sm text-gray-600">+90 531 458 9979</p>
            </a>

            {/* WhatsApp */}
            <a
              href="https://api.whatsapp.com/send?phone=905314589979"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center rounded-2xl bg-white p-6 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500 text-white transition-transform group-hover:scale-110">
                <MessageSquare className="h-6 w-6" />
              </div>
              <h3 className="mb-1 font-semibold text-gray-900">WhatsApp</h3>
              <p className="text-center text-sm text-gray-600">7/24 Destek</p>
            </a>

            {/* Email */}
            <a
              href="mailto:deniz@univotel.com"
              className="group flex flex-col items-center rounded-2xl bg-white p-6 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white transition-transform group-hover:scale-110">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="mb-1 font-semibold text-gray-900">E-posta</h3>
              <p className="text-center text-sm text-gray-600">deniz@univotel.com</p>
            </a>

            {/* Location */}
            <a
              href="https://maps.google.com/?q=Nişantaşı,+Şişli,+İstanbul"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center rounded-2xl bg-white p-6 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-black text-white transition-transform group-hover:scale-110">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="mb-1 font-semibold text-gray-900">Adres</h3>
              <p className="text-center text-sm text-gray-600">Nişantaşı, İstanbul</p>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left - Contact Info */}
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                İş Seyahatleriniz İçin
                <br />
                <span className="text-gray-500">Buradayız</span>
              </h2>
              <p className="mb-8 text-lg text-gray-600 leading-relaxed">
                Kurumsal konaklamalarınız, uzun dönem kiralamaları veya iş seyahati
                ihtiyaçlarınız için uzman ekibimiz size yardımcı olmaktan mutluluk duyar.
              </p>

              {/* Info Items */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                    <Clock className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Çalışma Saatleri</h4>
                    <p className="text-gray-600">
                      Pazartesi - Cuma: 09:00 - 18:00
                      <br />
                      Cumartesi: 10:00 - 14:00
                      <br />
                      <span className="text-sm text-gray-500">
                        WhatsApp desteği 7/24 aktif
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                    <MapPin className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Adres</h4>
                    <p className="text-gray-600">
                      Nişantaşı Mahallesi
                      <br />
                      Şişli, İstanbul 34365
                      <br />
                      Türkiye
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                    <Mail className="h-5 w-5 text-gray-700" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">E-posta Adresleri</h4>
                    <p className="text-gray-600">
                      Genel: deniz@univotel.com
                      <br />
                      Kurumsal: corporate@ketensuites.com
                      <br />
                      Rezervasyon: booking@ketensuites.com
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-10">
                <h4 className="mb-4 font-semibold text-gray-900">Sosyal Medya</h4>
                <div className="flex gap-3">
                  <a
                    href="https://instagram.com/ketensuites"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 text-white transition-transform hover:scale-110"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://facebook.com/ketensuites"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white transition-transform hover:scale-110"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://linkedin.com/company/ketensuites"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-700 text-white transition-transform hover:scale-110"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="rounded-3xl bg-gray-50 p-8 md:p-10">
              {isSubmitted ? (
                <div className="flex h-full flex-col items-center justify-center py-12 text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle2 className="h-10 w-10 text-green-600" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-gray-900">
                    Mesajınız Alındı!
                  </h3>
                  <p className="mb-6 text-gray-600">
                    En kısa sürede size geri dönüş yapacağız.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="rounded-xl"
                  >
                    Yeni Mesaj Gönder
                  </Button>
                </div>
              ) : (
                <>
                  <h3 className="mb-2 text-2xl font-bold text-gray-900">
                    Mesaj Gönderin
                  </h3>
                  <p className="mb-8 text-gray-600">
                    Formu doldurun, size en kısa sürede dönüş yapalım.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-gray-700">
                          Ad
                        </Label>
                        <Input
                          id="firstName"
                          placeholder="Adınız"
                          required
                          className="rounded-xl border-gray-200 bg-white py-5"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-gray-700">
                          Soyad
                        </Label>
                        <Input
                          id="lastName"
                          placeholder="Soyadınız"
                          required
                          className="rounded-xl border-gray-200 bg-white py-5"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700">
                        E-posta
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="ornek@sirket.com"
                        required
                        className="rounded-xl border-gray-200 bg-white py-5"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700">
                        Telefon
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="05XX XXX XX XX"
                        className="rounded-xl border-gray-200 bg-white py-5"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-gray-700">
                        Konu
                      </Label>
                      <Select>
                        <SelectTrigger className="rounded-xl border-gray-200 bg-white py-5">
                          <SelectValue placeholder="Konu seçin" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="reservation">Rezervasyon</SelectItem>
                          <SelectItem value="corporate">Kurumsal İşbirliği</SelectItem>
                          <SelectItem value="pricing">Fiyat Bilgisi</SelectItem>
                          <SelectItem value="tour">Daire Gezisi</SelectItem>
                          <SelectItem value="other">Diğer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-700">
                        Mesajınız
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="Mesajınızı buraya yazın..."
                        rows={5}
                        required
                        className="rounded-xl border-gray-200 bg-white resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full rounded-xl bg-black py-6 text-base font-semibold hover:bg-gray-800"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="h-5 w-5 animate-spin"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                              fill="none"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Gönderiliyor...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="h-5 w-5" />
                          Mesaj Gönder
                        </span>
                      )}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-10 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Konumumuz</h2>
            <p className="text-gray-600">
              İstanbul&apos;un kalbinde, Nişantaşı&apos;nın en prestijli adresinde
            </p>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3008.9598339539847!2d28.987779!3d41.048611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7a2935bdd25%3A0x85d88ba9b67e62f3!2sNi%C5%9Fanta%C5%9F%C4%B1%2C%20%C5%9Ei%C5%9Fli%2F%C4%B0stanbul!5e0!3m2!1str!2str!4v1699999999999!5m2!1str!2str"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale transition-all hover:grayscale-0"
            />
          </div>
        </div>
      </section>

      {/* Quick Contact Bar */}
      <section className="bg-black py-12">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white">
                Hemen Rezervasyon Yapın
              </h3>
              <p className="text-gray-400">
                İş seyahatiniz için en iyi fiyat garantisi
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:+905314589979"
                className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-black transition-all hover:scale-105"
              >
                <Phone className="h-5 w-5" />
                Hemen Ara
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=905314589979"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 font-semibold text-white transition-all hover:scale-105 hover:bg-green-600"
              >
                <MessageSquare className="h-5 w-5" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
