export interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  durationMinutes: number;
  description: string;
  image: string;
}

export const featuredServices: Service[] = [
  {
    id: "signature-haircut-styling",
    name: "Signature Haircut & Styling",
    category: "Haircut & Styling",
    price: 75,
    durationMinutes: 60,
    description:
      "A precision cut shaped to your features, finished with a polished blow-dry and soft, lasting style.",
    image: "/images/services/haircut-styling.jpg",
  },
  {
    id: "balayage-hair-coloring",
    name: "Balayage & Hair Coloring",
    category: "Hair Coloring",
    price: 180,
    durationMinutes: 150,
    description:
      "Hand-painted, sun-kissed color tailored to your tone, sealed with a glossy, salon-fresh finish.",
    image: "/images/services/hair-coloring.jpg",
  },
  {
    id: "restorative-hair-treatment",
    name: "Restorative Hair Treatment",
    category: "Hair Treatment",
    price: 95,
    durationMinutes: 45,
    description:
      "A deep-conditioning ritual that repairs dry ends, softens texture, and restores healthy natural shine.",
    image: "/images/services/hair-treatment.jpg",
  },
  {
    id: "radiance-facial-skincare",
    name: "Radiance Facial & Skincare",
    category: "Facial & Skincare",
    price: 120,
    durationMinutes: 60,
    description:
      "A gentle cleanse, exfoliation, and hydrating mask designed to leave skin calm, smooth, and luminous.",
    image: "/images/services/facial-skincare.jpg",
  },
  {
    id: "soft-glam-makeup",
    name: "Soft Glam Makeup",
    category: "Makeup",
    price: 110,
    durationMinutes: 60,
    description:
      "Natural, camera-ready makeup with a soft glow, tailored for events or an effortless everyday look.",
    image: "/images/services/makeup.jpg",
  },
  {
    id: "classic-manicure-pedicure",
    name: "Classic Manicure & Pedicure",
    category: "Manicure & Pedicure",
    price: 65,
    durationMinutes: 75,
    description:
      "Neat, polished nails with careful cuticle care, shaping, and a long-wearing, elegant finish.",
    image: "/images/services/manicure-pedicure.jpg",
  },
];
