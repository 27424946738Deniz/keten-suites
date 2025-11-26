import Image from "next/image";
import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CreditCard, Building2, Home, Shield, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Sıkça Sorulan Sorular | Keten Suites",
  description:
    "İş seyahatleri ve kurumsal konaklamalar hakkında merak ettikleriniz. Keten Suites SSS sayfası.",
};

const faqCategories = [
  {
    icon: CreditCard,
    title: "Rezervasyon ve Ödeme",
    items: [
      {
        question: "Kira bedeline neler dahil?",
        answer:
          "Kira bedeline mobilyalı daire, yüksek hızlı internet, merkezi ısıtma/soğutma, 7/24 güvenlik, ortak alan kullanımı (GYM, çalışma alanları, dinlenme alanları), haftalık temizlik hizmeti ve tüm beyaz eşyalar dahildir. Elektrik, su ve doğalgaz tüketim bedelleri ayrıca faturalandırılır.",
      },
      {
        question: "Minimum veya maksimum kalış süresi var mı?",
        answer:
          "Evet, minimum kalış süremiz 100 gündür. Bu süre, özellikle iş seyahati yapan profesyoneller ve kurumsal müşterilerimiz için ideal bir süreçtir. Maksimum kalış süresi için herhangi bir sınırlama bulunmamaktadır. Uzun dönem konaklamalar için özel fiyatlandırma seçeneklerimiz mevcuttur.",
      },
      {
        question: "Depozito talep ediliyor mu?",
        answer:
          "Evet, giriş sırasında 2 aylık kira bedeli tutarında depozito alınmaktadır. Bu depozito, çıkış sırasında daire kontrolü yapıldıktan sonra tam olarak iade edilmektedir. Kurumsal müşterilerimiz için alternatif depozito seçenekleri sunulmaktadır.",
      },
      {
        question: "Hangi ödeme yöntemlerini kabul ediyorsunuz?",
        answer:
          "Banka havalesi, EFT, kredi kartı ve kurumsal fatura seçeneklerimiz mevcuttur. Kurumsal müşterilerimiz için aylık faturalama ve vadeli ödeme planları sunuyoruz. Tüm ödemeler için yasal fatura düzenlenmektedir.",
      },
      {
        question: "İptal politikanız nedir?",
        answer:
          "Rezervasyondan 30 gün öncesine kadar yapılan iptallerde tam iade yapılmaktadır. 30 gün içinde yapılan iptallerde 1 aylık kira + hizmet bedeli tutarında kesinti uygulanır. Kurumsal anlaşmalarda özel iptal koşulları belirlenebilir.",
      },
    ],
  },
  {
    icon: Building2,
    title: "İş Seyahati & Kurumsal",
    items: [
      {
        question: "Kurumsal müşteriler için özel paketler var mı?",
        answer:
          "Evet, kurumsal müşterilerimiz için özel fiyatlandırma, esnek kiralama süreleri, toplu rezervasyon indirimleri ve özelleştirilmiş hizmet paketleri sunuyoruz. Şirketinizin ihtiyaçlarına göre özel anlaşmalar yapılabilir. Detaylı bilgi için kurumsal satış ekibimizle iletişime geçebilirsiniz.",
      },
      {
        question: "Çalışma alanı mevcut mu?",
        answer:
          "Her dairemizde ergonomik çalışma masası ve sandalye bulunmaktadır. Ayrıca binada ortak çalışma alanları (co-working space) mevcuttur. Yüksek hızlı fiber internet bağlantısı (100+ Mbps) tüm dairelerde standarttır. Video konferans için uygun sessiz çalışma ortamı sağlanmaktadır.",
      },
      {
        question: "Fatura kesebiliyor musunuz?",
        answer:
          "Evet, tüm ödemeler için yasal fatura düzenlenmektedir. Kurumsal müşterilerimiz için şirket adına fatura, e-fatura ve e-arşiv fatura seçenekleri mevcuttur. Aylık veya dönemlik faturalama tercihlerinize göre düzenleme yapılabilir.",
      },
      {
        question: "Yabancı uyruklu çalışanlar konaklayabilir mi?",
        answer:
          "Evet, yabancı uyruklu misafirlerimizi ağırlamaktan memnuniyet duyarız. Pasaport ve vize bilgileri ile rezervasyon yapılabilir. İngilizce konuşan misafir ilişkileri ekibimiz 7/24 destek sağlamaktadır. Oturma izni ve ikamet prosedürlerinde de yardımcı olabiliriz.",
      },
      {
        question: "Birden fazla çalışan için aynı anda rezervasyon yapabilir miyim?",
        answer:
          "Evet, kurumsal müşterilerimiz için toplu rezervasyon imkanı sunuyoruz. Tek sözleşme altında birden fazla daire kiralanabilir. Merkezi faturalandırma ve yönetim paneli ile tüm konaklamaları kolayca takip edebilirsiniz.",
      },
    ],
  },
  {
    icon: Home,
    title: "Daire ve Hizmetler",
    items: [
      {
        question: "Temizlik hizmeti sunuluyor mu?",
        answer:
          "Evet, haftalık profesyonel temizlik hizmeti kira bedeline dahildir. İsteğe bağlı olarak günlük veya 3 günde bir temizlik hizmeti ek ücret karşılığında sağlanabilir. Nevresim ve havlu değişimi de temizlik hizmetine dahildir.",
      },
      {
        question: "Evcil hayvan kabul ediliyor mu?",
        answer:
          "Evet, Keten Suites evcil hayvan dostu bir tesistir. Küçük ve orta boy evcil hayvanlar (köpek, kedi) kabul edilmektedir. Evcil hayvan için ek depozito talep edilebilir. Binada evcil hayvan yürüyüş alanları mevcuttur.",
      },
      {
        question: "Dairelerde hangi ekipmanlar mevcut?",
        answer:
          "Tüm dairelerimizde tam donanımlı mutfak (buzdolabı, fırın, mikrodalga, bulaşık makinesi), çamaşır ve kurutma makinesi, klima, merkezi ısıtma, Full HD akıllı TV, yüksek hızlı WiFi, çalışma masası, ütü seti ve saç kurutma makinesi bulunmaktadır.",
      },
      {
        question: "Otopark imkanı var mı?",
        answer:
          "Evet, binamızda kapalı otopark mevcuttur. Her daire için 1 araçlık park yeri tahsis edilmektedir. Ek araç park yeri ihtiyacı için lütfen önceden bilgi veriniz. Elektrikli araç şarj istasyonları da mevcuttur.",
      },
      {
        question: "Rezervasyondan önce daireyi görebilir miyim?",
        answer:
          "Evet, rezervasyon öncesi daire gezisi düzenlenmektedir. Randevu alarak misafir ilişkileri ekibimiz eşliğinde daireleri yerinde inceleyebilirsiniz. Uzaktan görüşme yapan misafirlerimiz için video tur hizmeti de sunulmaktadır.",
      },
    ],
  },
  {
    icon: Shield,
    title: "Giriş/Çıkış ve Güvenlik",
    items: [
      {
        question: "Giriş ve çıkış saatleri nedir?",
        answer:
          "Standart giriş saati 14:00, çıkış saati 11:00'dir. Erken giriş veya geç çıkış talepleri müsaitlik durumuna göre değerlendirilir. 7/24 resepsiyon hizmeti ile her saat giriş yapılabilir.",
      },
      {
        question: "Güvenlik önlemleri nelerdir?",
        answer:
          "Binamızda 7/24 güvenlik görevlisi, kapalı devre kamera sistemi, kartlı/kodlu giriş sistemi, yangın alarm ve söndürme sistemleri, depreme dayanıklı yapı ve acil durum protokolleri mevcuttur. Tüm dairelerde yangına dayanıklı kapılar ve yanmaz malzemeler kullanılmıştır.",
      },
      {
        question: "Anahtar teslimi nasıl yapılıyor?",
        answer:
          "Giriş günü resepsiyondan dijital anahtar kodu teslim alınır. 7/24 erişim imkanı sunan bu sistem ile anahtar kaybetme riski ortadan kalkar. İsteğe bağlı olarak fiziksel anahtar da verilebilir.",
      },
      {
        question: "Misafir kabul edebilir miyim?",
        answer:
          "Evet, günlük misafir kabul edilebilir. Gecelik misafir konaklamaları için önceden bilgi verilmesi gerekmektedir. Güvenlik nedeniyle tüm misafirlerin resepsiyonda kayıt yaptırması zorunludur.",
      },
    ],
  },
  {
    icon: MapPin,
    title: "Konum ve Ulaşım",
    items: [
      {
        question: "Konum olarak nerdesiniz?",
        answer:
          "Keten Suites, İstanbul'un en prestijli semti Nişantaşı'nda yer almaktadır. Şişli metro istasyonuna 5 dakika yürüme mesafesinde, Taksim'e 10 dakika, Levent iş merkezlerine 15 dakika uzaklıktadır. Havalimanı transferi için VIP araç hizmeti organize edilebilir.",
      },
      {
        question: "Havalimanı transferi sağlıyor musunuz?",
        answer:
          "Evet, İstanbul Havalimanı ve Sabiha Gökçen Havalimanı'ndan VIP transfer hizmeti sunulmaktadır. Transfer talebi en az 24 saat öncesinden yapılmalıdır. Kurumsal müşterilerimiz için özel transfer anlaşmaları yapılabilir.",
      },
      {
        question: "Yakınlarda restoran ve market var mı?",
        answer:
          "Nişantaşı, İstanbul'un en gelişmiş semtlerinden biridir. Yürüme mesafesinde lüks restoranlar, kafeler, süpermarketler, alışveriş merkezleri (City's Nişantaşı), bankalar, eczaneler ve sağlık kuruluşları bulunmaktadır.",
      },
    ],
  },
];

export default function SSSPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Modern Minimal */}
      <section className="relative h-[350px] md:h-[450px] overflow-hidden">
        <Image
          src="/1729083986_A6WDV4VDKB_medium.jpg"
          alt="Keten Suites İç Mekan"
          fill
          className="object-cover scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
            Yardım Merkezi
          </span>
          <h1 className="text-center text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Sıkça Sorulan Sorular
          </h1>
          <p className="mt-4 max-w-2xl text-center text-lg text-white/80">
            İş seyahatleriniz ve kurumsal konaklamalarınız hakkında bilmeniz gereken her şey
          </p>
        </div>
      </section>

      {/* Category Pills */}
      <section className="sticky top-16 z-40 border-b bg-white/95 backdrop-blur-md">
        <div className="container mx-auto max-w-5xl overflow-x-auto px-4">
          <div className="flex gap-2 py-4">
            {faqCategories.map((category, index) => (
              <a
                key={index}
                href={`#category-${index}`}
                className="flex shrink-0 items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-all hover:border-black hover:bg-black hover:text-white"
              >
                <category.icon className="h-4 w-4" />
                {category.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto max-w-4xl px-4">
          {/* FAQ Categories */}
          <div className="space-y-16">
            {faqCategories.map((category, catIndex) => (
              <div key={catIndex} id={`category-${catIndex}`} className="scroll-mt-32">
                {/* Category Header */}
                <div className="mb-8 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-white">
                    <category.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
                      {category.title}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {category.items.length} soru
                    </p>
                  </div>
                </div>

                {/* Accordion */}
                <Accordion type="single" collapsible className="w-full space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <AccordionItem
                      key={itemIndex}
                      value={`${catIndex}-${itemIndex}`}
                      className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-6 transition-all data-[state=open]:border-black data-[state=open]:shadow-lg"
                    >
                      <AccordionTrigger className="py-5 text-left text-base font-semibold text-gray-900 hover:no-underline [&[data-state=open]]:text-black">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="pb-5 text-gray-600 leading-relaxed">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          {/* Contact CTA - Modern Card */}
          <div className="mt-20 overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-black p-8 text-white md:p-12">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <h3 className="mb-4 text-3xl font-bold md:text-4xl">
                  Cevabını bulamadınız mı?
                </h3>
                <p className="text-gray-400">
                  Kurumsal satış ekibimiz iş seyahati ihtiyaçlarınız için size
                  yardımcı olmaktan mutluluk duyar. 7/24 destek hattımızdan bize ulaşabilirsiniz.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href="tel:+905314589979"
                  className="flex items-center justify-center gap-3 rounded-xl bg-white px-6 py-4 font-semibold text-black transition-all hover:scale-[1.02] hover:shadow-xl"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  +90 531 458 9979
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=905314589979"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 rounded-xl bg-green-500 px-6 py-4 font-semibold text-white transition-all hover:scale-[1.02] hover:bg-green-600 hover:shadow-xl"
                >
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp ile Yazın
                </a>
                <a
                  href="mailto:deniz@univotel.com"
                  className="flex items-center justify-center gap-3 rounded-xl border border-white/30 px-6 py-4 font-semibold text-white transition-all hover:scale-[1.02] hover:bg-white hover:text-black"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  E-posta Gönder
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
