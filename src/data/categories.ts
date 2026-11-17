export interface ServiceCategory {
  id: string;
  name: string;
  image: string;
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "haircut-styling",
    name: "Haircut & Styling",
    image: "/images/categories/haircut-styling.jpg",
  },
  {
    id: "hair-coloring",
    name: "Hair Coloring",
    image: "/images/categories/hair-coloring.jpg",
  },
  {
    id: "hair-treatment",
    name: "Hair Treatment",
    image: "/images/categories/hair-treatment.jpg",
  },
  {
    id: "facial-skincare",
    name: "Facial & Skincare",
    image: "/images/categories/facial-skincare.jpg",
  },
  {
    id: "makeup",
    name: "Makeup",
    image: "/images/categories/makeup.jpg",
  },
  {
    id: "manicure-pedicure",
    name: "Manicure & Pedicure",
    image: "/images/categories/manicure-pedicure.jpg",
  },
  {
    id: "spa-massage",
    name: "Spa & Massage",
    image: "/images/categories/spa-massage.jpg",
  },
];
