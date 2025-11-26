import { Unit, UnitType } from "@/types/units";

export const unitsMockData: any[] = [
  {
    id: "1+1-economy-suite",
    unit_name: "1+1 Economy Suite",
    slug: "1-plus-1-economy-suite",
    short_description:
      "Kompakt ve ekonomik stüdyo daire, bekarlar veya genç profesyoneller için ideal.",
    unit_type: UnitType.ECONOMY_1_PLUS_1,
    capacity: 2,
    base_price_per_month: 15000,
    description: `
      <p>Our 1+1 Economy Suite offers a comfortable and budget-friendly living space ideal for individuals and young professionals. Despite its compact size, the suite is thoughtfully designed to maximize space and functionality.</p>
      <p>The apartment features a cozy bedroom, a functional living area, a modern kitchenette, and a private bathroom. Large windows provide natural light throughout the day, creating a bright and welcoming atmosphere.</p>
      <p>Located on the lower floors of Keten Suites, these units offer easy access and a practical living solution without compromising on quality or comfort.</p>
    `,
    images: [
      {
        url: "/1729079653_XUWQKFQN04_medium.jpg",
        alt_text: "1+1 Economy Suite living area",
      },
      {
        url: "/units/1+1-economy-2.jpg",
        alt_text: "1+1 Economy Suite bedroom",
      },
      {
        url: "/units/1+1-economy-3.jpg",
        alt_text: "1+1 Economy Suite kitchen",
      },
    ],
    amenities: [
      { name: "WiFi", icon: "wifi", category: "internet" },
      {
        name: "Air Conditioning",
        icon: "air-conditioning",
        category: "comfort",
      },
      { name: "Heating", icon: "heating", category: "comfort" },
      { name: "Kitchenette", icon: "kitchen", category: "facilities" },
      { name: "Private Bathroom", icon: "bathroom", category: "facilities" },
      { name: "Study Desk", icon: "desk", category: "furniture" },
      { name: "Wardrobe", icon: "wardrobe", category: "furniture" },
    ],
    features: {
      squareFootage: 35,
      floor: "1-3",
      bedrooms: 1,
      bathrooms: 1,
      hasTerrace: false,
      hasBalcony: true,
      viewType: "City",
    },
    is_featured: false,
    display_order: 1,
  },
  {
    id: "1+1-premium-suite",
    unit_name: "1+1 Premium Suite",
    slug: "1-plus-1-premium-suite",
    unit_type: UnitType.PREMIUM_1_PLUS_1,
    capacity: 2,
    base_price_per_month: 22000,
    short_description:
      "Modern donanımlı, premium bitişli ve şehir manzaralı üst düzey stüdyo daire.",
    description: `
      <p>Experience elevated comfort in our 1+1 Premium Suite. This upgraded studio apartment offers a more spacious layout with high-end finishes and contemporary design elements.</p>
      <p>Featuring premium appliances, a larger living space, and superior fixtures throughout, this suite is perfect for professionals who appreciate quality and style. The bedroom area is generously sized, and the living room offers ample space for entertaining or relaxing.</p>
      <p>Located on the mid to upper floors, Premium Suites enjoy better views and enhanced natural light. Each unit comes with a fully equipped modern kitchen, a stylish bathroom with quality fixtures, and elegant furnishings.</p>
    `,
    images: [
      {
        url: "/1729086563_YZCWXUXA3A_medium.jpg",
        alt_text: "1+1 Premium Suite living space",
      },
      {
        url: "/units/1+1-premium-2.jpg",
        alt_text: "1+1 Premium Suite modern bedroom",
      },
      {
        url: "/units/1+1-premium-3.jpg",
        alt_text: "1+1 Premium Suite full kitchen",
      },
      {
        url: "/units/1+1-premium-4.jpg",
        alt_text: "1+1 Premium Suite bathroom",
      },
    ],
    amenities: [
      { name: "High-Speed WiFi", icon: "wifi", category: "internet" },
      {
        name: "Smart AC System",
        icon: "air-conditioning",
        category: "comfort",
      },
      { name: "Underfloor Heating", icon: "heating", category: "comfort" },
      { name: "Full Kitchen", icon: "kitchen", category: "facilities" },
      { name: "Premium Bathroom", icon: "bathroom", category: "facilities" },
      { name: "Work Station", icon: "desk", category: "furniture" },
      { name: "Built-in Wardrobe", icon: "wardrobe", category: "furniture" },
      { name: "Smart TV", icon: "tv", category: "entertainment" },
      { name: "Balcony", icon: "balcony", category: "outdoor" },
    ],
    features: {
      squareFootage: 50,
      floor: "4-7",
      bedrooms: 1,
      bathrooms: 1,
      hasTerrace: false,
      hasBalcony: true,
      viewType: "City & Park",
    },
    is_featured: true,
    display_order: 2,
  },
  {
    id: "2+1-economy-suite",
    unit_name: "2+1 Economy Suite",
    slug: "2-plus-1-economy-suite",
    unit_type: UnitType.ECONOMY_2_PLUS_1,
    capacity: 4,
    base_price_per_month: 28000,
    short_description:
      "Aileler veya ev arkadaşları için ideal, geniş iki yatak odalı daire.",
    description: `
      <p>Our 2+1 Economy Suite provides comfortable accommodation for families or groups sharing costs. With two separate bedrooms, this apartment offers privacy and space at an affordable price point.</p>
      <p>The open-plan living and dining area creates a welcoming space for family time or socializing with roommates. The fully equipped kitchen allows for home cooking, helping to manage living expenses effectively.</p>
      <p>Each bedroom is furnished with quality beds and storage, while the shared bathroom includes modern fixtures. Perfect for roommate groups or young families starting out in Istanbul.</p>
    `,
    images: [
      {
        url: "/1729079829_G88KISGAH3_medium.jpg",
        alt_text: "2+1 Economy Suite living room",
      },
      {
        url: "/units/2+1-economy-2.jpg",
        alt_text: "2+1 Economy Suite master bedroom",
      },
      {
        url: "/units/2+1-economy-3.jpg",
        alt_text: "2+1 Economy Suite second bedroom",
      },
      {
        url: "/units/2+1-economy-4.jpg",
        alt_text: "2+1 Economy Suite kitchen",
      },
    ],
    amenities: [
      { name: "WiFi", icon: "wifi", category: "internet" },
      {
        name: "Air Conditioning",
        icon: "air-conditioning",
        category: "comfort",
      },
      { name: "Central Heating", icon: "heating", category: "comfort" },
      { name: "Full Kitchen", icon: "kitchen", category: "facilities" },
      {
        name: "Washing Machine",
        icon: "washing-machine",
        category: "appliances",
      },
      { name: "Refrigerator", icon: "fridge", category: "appliances" },
      { name: "TV", icon: "tv", category: "entertainment" },
      { name: "Dining Table", icon: "table", category: "furniture" },
      { name: "Wardrobes", icon: "wardrobe", category: "furniture" },
    ],
    features: {
      squareFootage: 75,
      floor: "2-5",
      bedrooms: 2,
      bathrooms: 1,
      hasTerrace: false,
      hasBalcony: true,
      viewType: "City",
    },
    is_featured: false,
    display_order: 3,
  },
  {
    id: "2+1-family-duplex",
    unit_name: "2+1 Family Duplex with Terrace",
    slug: "2-plus-1-family-duplex",
    unit_type: UnitType.FAMILY_DUPLEX_2_PLUS_1,
    capacity: 5,
    base_price_per_month: 42000,
    short_description:
      "Özel teraslı iki katlı dubleks daire, aileler için mükemmel seçim.",
    description: `
      <p>Experience elevated family living in our 2+1 Family Duplex. This stunning two-story apartment combines space, privacy, and luxury with its innovative duplex design and private terrace.</p>
      <p>The ground floor features an expansive living and dining area, a modern fully-equipped kitchen, and a guest bathroom. Large sliding doors open onto your private terrace - perfect for outdoor dining, children's play area, or simply relaxing while enjoying fresh air and views.</p>
      <p>Upstairs, you'll find two generously-sized bedrooms and a full bathroom. The master bedroom includes built-in storage and excellent natural light. The second bedroom is perfect for children or can serve as a home office.</p>
      <p>This duplex design offers the feeling of a house while enjoying the security and amenities of apartment living. Ideal for families who value space, quality, and a touch of luxury.</p>
    `,
    images: [
      {
        url: "/1729084042_14BPRAW6MG_medium.jpg",
        alt_text: "2+1 Family Duplex living area",
      },
      {
        url: "/units/2+1-duplex-2.jpg",
        alt_text: "2+1 Family Duplex private terrace",
      },
      {
        url: "/units/2+1-duplex-3.jpg",
        alt_text: "2+1 Family Duplex master bedroom",
      },
      {
        url: "/units/2+1-duplex-4.jpg",
        alt_text: "2+1 Family Duplex modern kitchen",
      },
      {
        url: "/units/2+1-duplex-5.jpg",
        alt_text: "2+1 Family Duplex staircase",
      },
    ],
    amenities: [
      { name: "High-Speed WiFi", icon: "wifi", category: "internet" },
      {
        name: "Smart Climate Control",
        icon: "air-conditioning",
        category: "comfort",
      },
      { name: "Underfloor Heating", icon: "heating", category: "comfort" },
      { name: "Modern Kitchen", icon: "kitchen", category: "facilities" },
      { name: "Dishwasher", icon: "dishwasher", category: "appliances" },
      {
        name: "Washing Machine",
        icon: "washing-machine",
        category: "appliances",
      },
      { name: "Dryer", icon: "dryer", category: "appliances" },
      { name: "Smart TV", icon: "tv", category: "entertainment" },
      { name: "Private Terrace", icon: "terrace", category: "outdoor" },
      { name: "Outdoor Furniture", icon: "furniture", category: "outdoor" },
      { name: "Security System", icon: "security", category: "safety" },
    ],
    features: {
      squareFootage: 120,
      floor: "6-7 (Duplex)",
      bedrooms: 2,
      bathrooms: 2,
      hasTerrace: true,
      hasBalcony: false,
      viewType: "Panoramic City",
    },
    is_featured: true,
    display_order: 4,
  },
  {
    id: "3+1-family-duplex",
    unit_name: "3+1 Family Duplex with Terrace",
    slug: "3-plus-1-family-duplex",
    unit_type: UnitType.FAMILY_DUPLEX_3_PLUS_1,
    capacity: 6,
    base_price_per_month: 55000,
    short_description:
      "Geniş teraslı premium üç yatak odalı dubleks, büyük aileler için ideal.",
    description: `
      <p>Our flagship 3+1 Family Duplex represents the pinnacle of family living at Keten Suites. This spectacular two-story residence offers unparalleled space, luxury finishes, and a generous private terrace with breathtaking views.</p>
      <p>The lower level boasts an open-concept design with a spacious living room, elegant dining area, and a state-of-the-art kitchen with premium appliances and ample counter space. Floor-to-ceiling windows flood the space with natural light and provide stunning city views. Step out onto your expansive private terrace - an outdoor oasis perfect for family gatherings, BBQs, or quiet evenings under the stars.</p>
      <p>The upper floor houses three well-appointed bedrooms, including a luxurious master suite with en-suite bathroom. The additional two bedrooms share a modern family bathroom. Each room features built-in storage, quality finishes, and excellent natural light.</p>
      <p>This duplex is designed for families who want the best - combining the space of a house with the convenience and security of apartment living. Premium features throughout ensure comfort, while the intelligent layout provides both communal spaces and private retreats for every family member.</p>
    `,
    images: [
      {
        url: "/1729083986_A6WDV4VDKB_medium.jpg",
        alt_text: "3+1 Family Duplex spacious living room",
      },
      {
        url: "/units/3+1-duplex-2.jpg",
        alt_text: "3+1 Family Duplex expansive terrace",
      },
      {
        url: "/units/3+1-duplex-3.jpg",
        alt_text: "3+1 Family Duplex master suite",
      },
      {
        url: "/units/3+1-duplex-4.jpg",
        alt_text: "3+1 Family Duplex gourmet kitchen",
      },
      {
        url: "/units/3+1-duplex-5.jpg",
        alt_text: "3+1 Family Duplex second bedroom",
      },
      {
        url: "/units/3+1-duplex-6.jpg",
        alt_text: "3+1 Family Duplex third bedroom",
      },
    ],
    amenities: [
      { name: "Ultra High-Speed WiFi", icon: "wifi", category: "internet" },
      { name: "Smart Home System", icon: "smart-home", category: "technology" },
      {
        name: "Multi-Zone Climate Control",
        icon: "air-conditioning",
        category: "comfort",
      },
      { name: "Underfloor Heating", icon: "heating", category: "comfort" },
      { name: "Premium Kitchen", icon: "kitchen", category: "facilities" },
      { name: "Dishwasher", icon: "dishwasher", category: "appliances" },
      {
        name: "Washing Machine",
        icon: "washing-machine",
        category: "appliances",
      },
      { name: "Dryer", icon: "dryer", category: "appliances" },
      { name: "Smart TVs", icon: "tv", category: "entertainment" },
      { name: "Sound System", icon: "sound", category: "entertainment" },
      { name: "Large Terrace", icon: "terrace", category: "outdoor" },
      { name: "BBQ Area", icon: "bbq", category: "outdoor" },
      { name: "Outdoor Lounge", icon: "furniture", category: "outdoor" },
      { name: "Security System", icon: "security", category: "safety" },
      { name: "Video Intercom", icon: "intercom", category: "safety" },
    ],
    features: {
      squareFootage: 160,
      floor: "7-8 (Penthouse Duplex)",
      bedrooms: 3,
      bathrooms: 2,
      hasTerrace: true,
      hasBalcony: false,
      viewType: "Panoramic City & Bosphorus",
    },
    is_featured: true,
    display_order: 5,
  },
];
