export const propertiesMockData = [
  {
    id: "keten-suites",
    name: "Keten Suites",
    slug: "keten-suites",
    description: `
      <p>Welcome to Keten Suites, a modern residential complex offering comfortable living spaces in Istanbul.</p>
      <p>Our apartments are fully furnished with all the amenities you need for comfortable living. Located in the heart of Istanbul, you'll have easy access to public transportation, shopping, dining, and all the city has to offer.</p>
      <h3>Features:</h3>
      <ul>
        <li>Fully furnished apartments</li>
        <li>High-speed WiFi included</li>
        <li>24/7 security</li>
        <li>Modern common areas</li>
        <li>Laundry facilities</li>
        <li>Full kitchen in each unit</li>
      </ul>
    `,
    short_description: "Modern rental apartments in the heart of Istanbul",
    address: "Kadıköy, Istanbul, Turkey",
    city: "Istanbul",
    country: "Turkey",
    latitude: 40.9923,
    longitude: 29.0234,
    property_type: "apartments",
    images: [
      {
        id: "img-1",
        url: "/keten dışarıdan arka plan.jpg",
        alt_text: "Keten Suites building exterior",
        image_type: "hero",
        display_order: 0,
      },
      {
        id: "img-2",
        url: "/1729079653_XUWQKFQN04_medium.jpg",
        alt_text: "Modern apartment living room",
        image_type: "gallery",
        display_order: 1,
      },
      {
        id: "img-3",
        url: "/1729079829_G88KISGAH3_medium.jpg",
        alt_text: "Spacious apartment dining area",
        image_type: "gallery",
        display_order: 2,
      },
      {
        id: "img-4",
        url: "/1729083986_A6WDV4VDKB_medium.jpg",
        alt_text: "Modern apartment kitchen",
        image_type: "gallery",
        display_order: 3,
      },
      {
        id: "img-5",
        url: "/1729084042_14BPRAW6MG_medium.jpg",
        alt_text: "Apartment bedroom",
        image_type: "gallery",
        display_order: 4,
      },
      {
        id: "img-6",
        url: "/1729086563_YZCWXUXA3A_medium.jpg",
        alt_text: "Apartment balcony view",
        image_type: "gallery",
        display_order: 5,
      },
    ],
    property_amenities: [
      {
        amenity: {
          id: "amenity-1",
          name: "WiFi",
          icon: "wifi",
          category: "internet",
        },
      },
      {
        amenity: {
          id: "amenity-2",
          name: "Air Conditioning",
          icon: "air-conditioning",
          category: "comfort",
        },
      },
      {
        amenity: {
          id: "amenity-3",
          name: "Heating",
          icon: "heating",
          category: "comfort",
        },
      },
      {
        amenity: {
          id: "amenity-4",
          name: "Kitchen",
          icon: "kitchen",
          category: "facilities",
        },
      },
      {
        amenity: {
          id: "amenity-5",
          name: "Washing Machine",
          icon: "washing-machine",
          category: "appliances",
        },
      },
      {
        amenity: {
          id: "amenity-6",
          name: "TV",
          icon: "tv",
          category: "entertainment",
        },
      },
      {
        amenity: {
          id: "amenity-7",
          name: "Elevator",
          icon: "elevator",
          category: "facilities",
        },
      },
    ],
    units: [
      {
        id: "unit-1",
        unit_name: "1+1 Economy Suite",
        unit_type: "1+1-economy",
        capacity: 2,
        base_price_per_month: 15000,
        student_discount_percentage: 10,
      },
      {
        id: "unit-2",
        unit_name: "1+1 Premium Suite",
        unit_type: "1+1-premium",
        capacity: 2,
        base_price_per_month: 22000,
        student_discount_percentage: 10,
      },
    ],
  },
];

