import runningShoes from "../assets/images/products/running-shoes.png";
import laptop from "../assets/images/products/laptop.png";
import smartwatch from "../assets/images/products/smartwatch.png";
import perfume from "../assets/images/products/perfume.png";
import hoodie from "../assets/images/products/hoodie.png";
import sofa from "../assets/images/products/sofa.png";

const products = [
  {
    id: 1,
    name: "Premium Running Shoes",
    category: "Shoes",
    image:runningShoes,
    images: [
      runningShoes,
      runningShoes,
      runningShoes,
      runningShoes,
    ],
    price: 2499,
    originalPrice: 3499,
    rating: 4.8,
    reviews: 128,
    badge: "Best Seller",
    isNew: true,
    inStock: true,
  },

  {
    id: 2,
    name: "Ultra Slim Laptop",
    category: "Electronics",
    image:laptop,
    images: [
      laptop,
      laptop,
      laptop,
      laptop,
    ],
    price: 68999,
    originalPrice: 74999,
    rating: 4.9,
    reviews: 85,
    badge: "Hot",
    isNew: true,
    inStock: true,
  },

  {
    id: 3,
    name: "Smart Watch Pro",
    category: "Electronics",
     image: smartwatch,
    images: [
      smartwatch,
      smartwatch,
      smartwatch,
      smartwatch,
    ],
    price: 7999,
    originalPrice: 9999,
    rating: 4.7,
    reviews: 204,
    badge: "Trending",
    isNew: true,
    inStock: true,
  },

  {
    id: 4,
    name: "Luxury Perfume",
    category: "Beauty",
    image: perfume,
    images: [
      perfume,
      perfume,
      perfume,
      perfume,
    ],
    price: 3499,
    originalPrice: 4499,
    rating: 4.8,
    reviews: 91,
    badge: "Popular",
    isNew: true,
    inStock: true,
  },

  {
    id: 5,
    name: "Premium Blue Hoodie",
    category: "Fashion",
    image:hoodie,
    images:[
      hoodie,
      hoodie,
      hoodie,
      hoodie,
    ],
    price: 1999,
    originalPrice: 2799,
    rating: 4.6,
    reviews: 147,
    badge: "Sale",
    isNew: false,
    inStock: true,
  },

  {
    id: 6,
    name: "Modern Luxury Sofa",
    category: "Furniture",
    image:sofa,
    images: [
      sofa,
      sofa,
      sofa,
      sofa,
    ],
    price: 25999,
    originalPrice: 31999,
    rating: 4.9,
    reviews: 63,
    badge: "Premium",
    isNew: false,
    inStock: true,
  },
];

export default products;